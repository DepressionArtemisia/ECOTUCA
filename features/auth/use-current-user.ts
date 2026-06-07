"use client";

import { useAuth } from "@/features/auth/auth-provider";

export function useCurrentUser() {
  return useAuth().user;
}
