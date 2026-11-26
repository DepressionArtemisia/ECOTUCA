import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, ClipboardCheck, UploadCloud, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { forumTopics, learningTracks, teacherEvaluations } from "@/lib/mock-data/ecotuca";

const shortcuts = [
  { title: "Turmas", description: "Veja o progresso e identifique quem precisa de apoio.", href: "/app/professor/turmas", icon: UsersRound },
  { title: "Conteúdos", description: "Prepare aulas, materiais e propostas de atividade.", href: "/app/professor/conteudos", icon: UploadCloud },
  { title: "Avaliações", description: "Leia as entregas e organize as devolutivas.", href: "/app/professor/avaliacoes", icon: ClipboardCheck }
];

export function TeacherDashboard() {
  const pending = teacherEvaluations.filter((item) => item.status === "pending").length;

  return (
    <div className="workspace-grid">
      <header className="workspace-intro">
        <div>
          <p className="section-label"><span /> Ensino</p>
          <h1 className="text-display-lg mt-2">Área do professor</h1>
          <p className="mt-3 max-w-[55ch] text-[var(--muted)]">Organize suas turmas, prepare materiais e acompanhe as entregas dos alunos.</p>
        </div>
        <Link href="/app/professor/avaliacoes" className={buttonVariants()}>Abrir avaliações <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </header>

      <section className="grid gap-3 md:grid-cols-3" aria-label="Atalhos do professor">
        {shortcuts.map(({ title, description, href, icon: Icon }) => (
          <Link href={href} key={href} className="brand-card workspace-shortcut">
            <span className="workspace-icon"><Icon size={21} aria-hidden="true" /></span>
            <ArrowRight size={18} className="ml-auto" aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)]" aria-label="Acompanhamento pedagógico">
        <div className="brand-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-card-title">Progresso das trilhas</h2>
            <Badge>Dados de exemplo</Badge>
          </div>
          <ul className="mt-4 space-y-4">
            {learningTracks.map((track) => (
              <li key={track.id}>
                <div className="mb-2 flex justify-between gap-3 text-sm font-bold"><span>{track.title}</span><span>{track.progressPercent}%</span></div>
                <Progress value={track.progressPercent} label={track.title} />
              </li>
            ))}
          </ul>
        </div>
        <div className="brand-card p-5 sm:p-6">
          <h2 className="text-card-title">Acompanhe a turma</h2>
          <p className="mt-3 text-[var(--muted)]"><strong className="text-[var(--foreground)]">{pending}</strong> entregas pendentes no exemplo de avaliações.</p>
          <div className="mt-5 border-t border-[var(--border-soft)] pt-4">
            <p className="font-bold">Tópico recente da comunidade</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{forumTopics[0].title}</p>
            <Link href="/app/professor/comunidade" className="inline-action mt-2 text-sm"><BookOpen size={16} aria-hidden="true" /> Abrir comunidade</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
