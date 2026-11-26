"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/auth-provider";
import { accountHome } from "@/lib/data/auth";

export default function AppIndexPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) router.replace(accountHome(user));
  }, [loading, router, user]);

  return <p className="site-container py-10" role="status">Abrindo sua área…</p>;
}
