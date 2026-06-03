import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Portföy",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="border-b hairline py-12 md:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Portföy"
            title="Gerçek işler geldikçe markanın ağırlığını taşıyacak vitrin."
            text="Bu bölüm başlangıçta konsept portföy mantığıyla çalışır. Şirketin tamamlanan projeleri, filo çalışmaları ve emlak portföyleri zamanla burada yayınlanabilir."
          />
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="site-container grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="border hairline bg-white">
              <img src={project.image} alt={project.title} className="h-80 w-full object-cover" />
              <div className="p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">{project.category}</p>
                <h2 className="mt-3 text-2xl font-semibold">{project.title}</h2>
                <p className="mt-2 text-sm text-[#6b6760]">{project.location}</p>
                <p className="mt-5 text-sm leading-7 text-[#5e5a53]">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-16">
        <div className="site-container border hairline bg-white p-5 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">Yeni proje için detaylı talep alın.</h2>
            <Link href="/talep" className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
              Talep oluştur <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
