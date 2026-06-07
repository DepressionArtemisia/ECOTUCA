"use client";

import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/features/auth/logout-button";
import { useAuth } from "@/features/auth/auth-provider";

export function DemoSessionPill() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-brand-brown/10 bg-white px-3 py-2 text-xs font-black shadow-sm dark:border-brand-yellow/15 dark:bg-white/10">
        <UserRound size={15} />
        <span className="max-w-[140px] truncate">{user.name}</span>
        <Badge tone={user.status === "pending" ? "coral" : "mint"}>{user.role}</Badge>
        <Badge tone={user.source === "supabase" ? "mint" : "yellow"}>{user.source === "supabase" ? "Supabase" : "Apresentacao"}</Badge>
      </div>
      <LogoutButton />
    </div>
  );
}
