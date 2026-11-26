import type { CurrentUser } from "@/lib/data/auth";
import type { UserRole, UserStatus } from "@/types/domain";

const approvedOnly: UserStatus[] = ["approved"];
const allAppRoles: UserRole[] = ["student", "teacher", "guide", "tourist", "admin", "super_admin"];

export type AccessRequirement = {
  label: string;
  roles: UserRole[];
  statuses: UserStatus[];
};

export type AccessDecisionReason =
  | "allowed"
  | "not_authenticated"
  | "demo_source_denied"
  | "status_pending"
  | "status_denied"
  | "role_denied";

export type AccessDecision = {
  allowed: boolean;
  reason: AccessDecisionReason;
  requirement: AccessRequirement | null;
};

export function getAppAccessRequirement(pathname: string): AccessRequirement | null {
  const path = normalizePathname(pathname);
  if (path !== "/app" && !path.startsWith("/app/")) return null;

  if (path === "/app/aguardando-aprovacao") {
    return {
      label: "Status de aprovacao",
      roles: allAppRoles,
      statuses: ["pending", "approved", "rejected", "suspended", "inactive"]
    };
  }

  if (path.startsWith("/app/admin")) {
    return {
      label: "Painel administrativo",
      roles: ["admin", "super_admin"],
      statuses: approvedOnly
    };
  }

  if (path.startsWith("/app/professor")) {
    return {
      label: "Painel do professor",
      roles: ["teacher", "admin", "super_admin"],
      statuses: approvedOnly
    };
  }

  if (path.startsWith("/app/aluno")) {
    return {
      label: "Painel do aluno",
      roles: ["student", "admin", "super_admin"],
      statuses: approvedOnly
    };
  }

  if (path.startsWith("/app/guia")) {
    return {
      label: "Painel do guia",
      roles: ["guide", "admin", "super_admin"],
      statuses: approvedOnly
    };
  }

  if (path.startsWith("/app/turista")) {
    return {
      label: "Painel do visitante",
      roles: ["tourist", "admin", "super_admin"],
      statuses: approvedOnly
    };
  }

  return {
    label: "Area interna ECOTUCA",
    roles: allAppRoles,
    statuses: approvedOnly
  };
}

export function getAccessDecision(
  user: CurrentUser | null,
  pathname: string,
  options: { allowDemoSource?: boolean } = {}
): AccessDecision {
  const requirement = getAppAccessRequirement(pathname);
  if (!requirement) return { allowed: true, reason: "allowed", requirement };
  if (!user) return { allowed: false, reason: "not_authenticated", requirement };
  if (user.source === "demo" && options.allowDemoSource === false) {
    return { allowed: false, reason: "demo_source_denied", requirement };
  }
  if (!requirement.statuses.includes(user.status)) {
    return {
      allowed: false,
      reason: user.status === "pending" ? "status_pending" : "status_denied",
      requirement
    };
  }
  if (!requirement.roles.includes(user.role)) {
    return { allowed: false, reason: "role_denied", requirement };
  }
  return { allowed: true, reason: "allowed", requirement };
}

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}
