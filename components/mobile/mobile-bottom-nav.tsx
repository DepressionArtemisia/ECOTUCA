"use client";

import Link from "next/link";
import { Bell, BookOpen, Home, MapPinned, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Inicio", href: "/app/aluno", icon: Home },
  { label: "Trilhas", href: "/app/aluno/trilhas", icon: BookOpen },
  { label: "Roteiros", href: "/roteiros", icon: MapPinned },
  { label: "Avisos", href: "/app/notificacoes", icon: Bell },
  { label: "Perfil", href: "/app/perfil", icon: UserRound }
];

export function MobileBottomNav({ compact = false }: { compact?: boolean }) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-brown/10 bg-white/95 px-2 py-2 shadow-brand backdrop-blur lg:hidden dark:border-brand-yellow/15 dark:bg-brand-brown/95",
        compact && "absolute"
      )}
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-black text-brand-brown hover:bg-brand-yellow/35 dark:text-brand-cream dark:hover:bg-white/10">
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
