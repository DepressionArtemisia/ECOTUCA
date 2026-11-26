export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { status: "ok", release: process.env.ECOTUCA_RELEASE ?? "local" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
