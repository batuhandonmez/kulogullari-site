import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { sectors } from "@/lib/content";

export const metadata = {
  title: "Sektörler",
};

export default function SectorsPage() {
  return (
    <PageShell>
      <section className="border-b hairline py-12 md:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Faaliyet alanları"
            title="Birden fazla sektörde aynı kurumsal disiplin."
            text="Kuloğulları LTD. ŞTİ. için site yapısı yeni iş alanları eklendikçe büyüyebilen modüler bir vitrin olarak kurgulandı."
          />
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="site-container grid gap-7">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <article key={sector.slug} className="grid overflow-hidden border hairline bg-white lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-64 sm:min-h-80">
                  <img src={sector.image} alt={sector.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-5 sm:p-8 md:p-10">
                  <Icon size={30} className="text-[#9b783e]" />
                  <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">{sector.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[#6b6760]">{sector.short}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {sector.points.map((point) => (
                      <div key={point} className="border hairline p-4 text-sm font-medium">
                        <Check size={16} className="mb-3 text-[#9b783e]" />
                        {point}
                      </div>
                    ))}
                  </div>
                  <Link href={`/talep?sector=${sector.slug}`} className="mt-8 inline-flex items-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
                    Bu alan için talep oluştur <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
