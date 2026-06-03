import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Kurumsal",
};

const values = ["Şeffaf iletişim", "Kayıtlı süreç yönetimi", "Uzun vadeli marka güveni", "Ölçeklenebilir iş modeli"];

export default function CorporatePage() {
  return (
    <PageShell>
      <section className="border-b hairline py-12 md:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Kurumsal"
            title="Kuloğulları LTD. ŞTİ. için sade, ciddi ve büyümeye hazır bir marka zemini."
            text="Şirket; inşaat, emlak, araç kiralama ve yeni iş alanlarında müşterinin talebini doğru anlamaya odaklanan bir yapı olarak konumlandırılır."
          />
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
            alt="Kurumsal toplantı alanı"
            className="h-72 w-full object-cover sm:h-[420px]"
          />
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="site-container grid gap-8 md:grid-cols-2">
          <div className="border hairline bg-white p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Yaklaşım</p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Önce ihtiyaç, sonra teklif.</h2>
            <p className="mt-5 text-base leading-8 text-[#6b6760]">
              Her müşteri talebi farklıdır. Bu nedenle site, basit bir iletişim formu yerine
              sektör bazlı bilgi toplar ve ekibin daha doğru ön değerlendirme yapmasını sağlar.
            </p>
          </div>
          <div className="grid gap-4">
            {values.map((value) => (
              <div key={value} className="flex items-center gap-4 border hairline bg-white p-5">
                <CheckCircle2 className="text-[#9b783e]" size={22} />
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
