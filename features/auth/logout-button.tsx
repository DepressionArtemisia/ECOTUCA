"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-provider";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="outline" size="sm" onClick={logout}>
      <LogOut size={15} />
      Logout
    </Button>
  );
}
