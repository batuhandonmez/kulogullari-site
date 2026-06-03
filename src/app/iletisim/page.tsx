import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "İletişim",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="border-b hairline py-12 md:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="İletişim"
            title="Talebi netleştirmek için ilk bilgileri paylaşın."
            text="Telefon ve adres bilgileri kesinleştiğinde bu alan doğrudan güncellenebilir. Şimdilik en sağlıklı akış, detaylı talep formu üzerinden ilerler."
          />
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="site-container grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            {[
              { icon: Phone, title: "Telefon", text: "05xx xxx xx xx" },
              { icon: Mail, title: "E-posta", text: "bilgi@kulogullari.com" },
              { icon: MapPin, title: "Bölge", text: "Türkiye genelinde proje değerlendirme" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border hairline bg-white p-6">
                  <Icon className="text-[#9b783e]" size={24} />
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#6b6760]">{item.title}</p>
                  <p className="mt-2 text-xl font-semibold">{item.text}</p>
                </div>
              );
            })}
          </div>
          <div className="border hairline bg-white p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Daha doğru teklif için</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Detaylı talep akışını kullanın.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#6b6760]">
              İnşaat, araç kiralama ve emlak talepleri farklı bilgiler gerektirir. Akıllı form
              seçtiğiniz sektöre göre gerekli alanları açar.
            </p>
            <Link href="/talep" className="mt-8 inline-flex items-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
              Talep oluştur <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
