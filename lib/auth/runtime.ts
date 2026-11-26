export type AccessControlMode = "preview" | "enforce";

export function isPreviewAuthFallbackEnabled() {
  return !shouldEnforceAppAccess() && process.env.NEXT_PUBLIC_DISABLE_AUTH_FALLBACK !== "true";
}

export function getAccessControlMode(): AccessControlMode {
  return process.env.NEXT_PUBLIC_ACCESS_CONTROL_MODE === "enforce" ? "enforce" : "preview";
}

export function shouldEnforceAppAccess() {
  return getAccessControlMode() === "enforce";
}

export function isDemoSessionAllowedInEnforcedAccess() {
  return process.env.NEXT_PUBLIC_ALLOW_DEMO_SESSION_IN_PRODUCTION === "true";
}
