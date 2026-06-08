"use client";

import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/features/auth/logout-button";
import { useAuth } from "@/features/auth/auth-provider";

export function DemoSessionPill() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex w-full min-w-0 flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end">
      <div className="flex min-w-0 max-w-full flex-1 items-center gap-2 rounded-lg border border-brand-brown/10 bg-white px-3 py-2 text-xs font-black shadow-sm sm:flex-none dark:border-brand-yellow/15 dark:bg-white/10">
        <UserRound className="shrink-0" size={15} />
        <span className="min-w-0 max-w-[108px] truncate sm:max-w-[140px]">{user.name}</span>
        <Badge className="shrink-0 px-2 sm:px-3" tone={user.status === "pending" ? "coral" : "mint"}>{user.role}</Badge>
        <Badge className="shrink-0 px-2 sm:px-3" tone={user.source === "supabase" ? "mint" : "yellow"}>{user.source === "supabase" ? "Supabase" : "Apresentacao"}</Badge>
      </div>
      <LogoutButton />
    </div>
  );
}
