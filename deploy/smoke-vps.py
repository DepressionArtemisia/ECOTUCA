"""Check the running Auth, REST and Storage endpoints using disposable fixtures."""
import json
import secrets
import subprocess
import urllib.error
import urllib.request
import uuid
from pathlib import Path

ROOT = Path("/opt/ecotuca")
LOCAL_GATEWAY = "http://127.0.0.1:8100"


def read_env(path):
    return dict(
        line.split("=", 1)
        for line in path.read_text().splitlines()
        if line.strip() and not line.startswith("#") and "=" in line
    )


def request(base, path, key, *, token=None, method="GET", payload=None, content_type=None):
    data = json.dumps(payload).encode() if isinstance(payload, dict) else payload
    headers = {"apikey": key, "Authorization": f"Bearer {token or key}"}
    if data is not None:
        headers["Content-Type"] = content_type or "application/json"
    req = urllib.request.Request(base + path, method=method, headers=headers, data=data)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, error.read()


def sql(command):
    result = subprocess.run(
        ["docker", "exec", "-i", "supabase-db", "psql", "-X", "-Atq", "-U", "postgres",
         "-d", "postgres", "-v", "ON_ERROR_STOP=1"],
        input=command, text=True, check=True, capture_output=True,
    )
    return result.stdout.strip()


def expect(label, outcome, codes):
    status, body = outcome
    if status not in codes:
        raise RuntimeError(f"{label}: unexpected HTTP {status}")
    return body


def main():
    origin = "https://" + read_env(ROOT / "host.env")["ECOTUCA_HOST"]
    env = read_env(ROOT / "supabase" / ".env")
    service = env["SERVICE_ROLE_KEY"]
    anon = env["ANON_KEY"]
    admin_path = "/auth/v1/admin/users"
    objects_path = "/storage/v1/object/lesson-materials/"
    users = []
    object_key = None

    def create(role, status):
        email = f"ecotuca-{secrets.token_hex(12)}@rehearsal.invalid"
        password = secrets.token_urlsafe(28)
        body = expect("create auth fixture", request(
            LOCAL_GATEWAY, admin_path, service, method="POST",
            payload={"email": email, "password": password, "email_confirm": True},
        ), (200, 201))
        uid = str(uuid.UUID(json.loads(body)["id"]))
        users.append(uid)
        sql(f"insert into public.profiles(id, full_name, email, role, status) "
            f"values ('{uid}', 'ECOTUCA rehearsal', '{email}', '{role}', '{status}');")
        profile = expect("password sign-in", request(
            origin, "/auth/v1/token?grant_type=password", anon, method="POST",
            payload={"email": email, "password": password},
        ), (200,))
        return uid, json.loads(profile)["access_token"]

    try:
        expect("authenticated gateway health", request(origin, "/auth/v1/health", anon), (200,))
        expect("blocked public Auth administration", request(origin, admin_path, anon), (404,))
        expect("blocked public signup", request(origin, "/auth/v1/signup", anon, method="POST", payload={}), (404,))

        student_id, student = create("student", "pending")
        _, admin = create("admin", "approved")
        teacher_id, teacher = create("teacher", "approved")
        own_profile = "/rest/v1/profiles?id=eq." + student_id + "&select=status"
        read_own = lambda: json.loads(expect("own profile", request(origin, own_profile, anon, token=student), (200,)))
        if read_own() != [{"status": "pending"}]:
            raise RuntimeError("pending profile did not report the expected status")
        review = "/rest/v1/rpc/review_pending_profile"
        payload = {"profile_id": student_id, "decision": "approved"}
        expect("student cannot approve", request(origin, review, anon, token=student, method="POST", payload=payload), (403,))
        decision = expect("admin approval", request(origin, review, anon, token=admin, method="POST", payload=payload), (200,))
        if json.loads(decision) is not True or read_own() != [{"status": "approved"}]:
            raise RuntimeError("admin approval did not persist")
        if sql(f"select count(*) from public.access_review_events where subject_id = '{student_id}';") != "1":
            raise RuntimeError("approval audit entry missing")
        print("HTTPS Auth sign-in, permission checks, approval and audit: OK")

        object_key = teacher_id + "/smoke-" + secrets.token_hex(8) + ".pdf"
        pdf = b"%PDF-1.4\n% ECOTUCA test\n%%EOF\n"
        expect("teacher upload", request(origin, objects_path + object_key, anon, token=teacher,
                                        method="POST", payload=pdf, content_type="application/pdf"), (200, 201))
        actual = expect("teacher reads owned object", request(
            origin, "/storage/v1/object/authenticated/lesson-materials/" + object_key, anon, token=teacher,
        ), (200,))
        if actual != pdf:
            raise RuntimeError("download bytes differ from uploaded bytes")
        expect("student cannot read teacher object", request(
            origin, "/storage/v1/object/authenticated/lesson-materials/" + object_key, anon, token=student,
        ), (400, 403, 404))
        print("Private Storage upload, download and isolation: OK")
    finally:
        if object_key:
            expect("remove fixture object", request(LOCAL_GATEWAY, objects_path + object_key, service, method="DELETE"), (200, 204, 404))
        for uid in users:
            sql(f"delete from public.access_review_events where subject_id = '{uid}' or reviewer_id = '{uid}';")
            expect("remove fixture account", request(LOCAL_GATEWAY, f"{admin_path}/{uid}", service, method="DELETE"), (200, 204, 404))
        print(f"Removed {len(users)} temporary Auth profiles")


if __name__ == "__main__":
    main()
