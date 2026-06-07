import { MessageCircle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { forumTopics } from "@/lib/mock-data/ecotuca";

export default function StudentCommunityPage() {
  return (
    <AppShell title="Comunidade">
      <section className="mx-auto max-w-5xl">
        <Badge tone="coral">Forum ECOTUCA</Badge>
        <h1 className="brand-display mt-4 text-5xl">Comunidade</h1>
        <div className="mt-6 space-y-4">
          {forumTopics.map((topic) => (
            <article key={topic.title} className="rounded-lg bg-white p-5 shadow-brand dark:bg-white/10">
              <p className="text-sm font-black uppercase text-brand-blue">{topic.category}</p>
              <h2 className="mt-2 text-xl font-black">{topic.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-bold"><MessageCircle size={16} />{topic.replies} respostas - {topic.author}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
