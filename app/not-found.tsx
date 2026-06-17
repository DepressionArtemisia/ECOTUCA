import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { EcoButton } from "@/components/brand/eco-button";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="mx-auto flex min-h-[58vh] max-w-3xl flex-col items-start justify-center px-5 py-16">
        <p className="rounded-full bg-brand-coral px-4 py-2 text-sm font-black text-white">404</p>
        <h1 className="brand-display mt-5 text-5xl text-brand-brown dark:text-brand-yellow">Caminho nao encontrado</h1>
        <p className="mt-4 text-lg text-brand-brown/75 dark:text-brand-cream">
          Esta pagina nao esta disponivel. Volte para o inicio e continue pela plataforma ECOTUCA.
        </p>
        <Link href="/" className="mt-6">
          <EcoButton>Voltar para o inicio</EcoButton>
        </Link>
      </section>
    </PublicShell>
  );
}
