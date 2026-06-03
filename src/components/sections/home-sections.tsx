import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { processSteps, projects, sectors, trustItems } from "@/lib/content";
import { SectionHeading } from "../section-heading";

export function HeroSection() {
  return (
    <section className="border-b hairline bg-[#f7f5f1]">
      <div className="site-container grid min-h-[calc(100svh-80px)] items-center gap-8 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b783e]">
            İnşaat · Emlak · Araç Kiralama · Yazılım
          </p>
          <h1 className="mt-5 text-[2.7rem] font-semibold leading-[1.04] text-[#191816] sm:text-5xl md:text-7xl">
            Kuloğulları için güven veren kurumsal iş platformu.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#5e5a53] sm:text-lg">
            Çok sektörlü faaliyetleri tek çatı altında anlatan, talepleri kayıt altına alan
            ve teklif sürecini hızlandıran profesyonel web altyapısı.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/talep" className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
              Talep Oluştur
              <ArrowRight size={16} />
            </Link>
            <Link href="/sektorler" className="inline-flex items-center justify-center gap-2 border hairline px-5 py-4 text-sm font-semibold text-[#191816]">
              Faaliyet Alanları
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden border hairline bg-white sm:min-h-[430px] lg:min-h-[620px]">
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
            alt="Modern müstakil yapı"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-white/24 bg-[#191816]/88 p-6 text-white backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-3">
              {["Kayıtlı talep", "Net ön analiz", "Teklif hazırlığı"].map((item) => (
                <div key={item}>
                  <Check className="mb-3" size={18} />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectorsPreview() {
  return (
    <section className="py-14 md:py-20">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Faaliyet alanları"
            title="Şirket büyüdükçe genişleyen, kontrollü bir hizmet mimarisi."
            text="Her sektör kendi müşteri beklentisine göre anlatılır; talep formu da seçilen hizmete göre şekillenir."
          />
          <Link href="/sektorler" className="inline-flex items-center gap-2 text-sm font-semibold text-[#191816]">
            Tüm sektörler <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <article key={sector.slug} className="group grid overflow-hidden border hairline bg-white md:grid-cols-[0.86fr_1fr]">
                <div className="relative min-h-64">
                  <img src={sector.image} alt={sector.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5 sm:p-7">
                  <Icon size={26} className="text-[#9b783e]" />
                  <h3 className="mt-5 text-2xl font-semibold">{sector.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6b6760]">{sector.short}</p>
                  <ul className="mt-6 grid gap-3 text-sm text-[#34312d]">
                    {sector.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <Check size={16} className="mt-0.5 text-[#9b783e]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="border-y hairline bg-white py-14 md:py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Talep süreci"
          title="Kullanıcı bilgiyi seçer, ekip teklif için düzenli veri alır."
          text="Form, klasik iletişim kutusu gibi değil; sektör seçimine göre gerekli detayları toplar."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <div key={step} className="border hairline p-6">
              <span className="text-sm font-semibold text-[#9b783e]">0{index + 1}</span>
              <p className="mt-8 text-xl font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  return (
    <section className="py-14 md:py-20">
      <div className="site-container">
        <SectionHeading
          eyebrow="Portföy yaklaşımı"
          title="Gerçek projeler eklendikçe güçlenecek ciddi bir vitrin."
          text="İlk yayında konsept portföy kartları kullanılır; gerçek işler geldikçe fotoğraf, lokasyon ve açıklamalar değiştirilebilir."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="border hairline bg-white">
              <div className="relative h-72 overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">{project.category}</p>
                <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-[#6b6760]">{project.location}</p>
                <p className="mt-4 text-sm leading-7 text-[#5e5a53]">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="bg-[#191816] py-14 text-white md:py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7b36d]">Kurumsal düzen</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            İlk izlenimi güçlü, operasyonu takip edilebilir.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            Site yalnızca vitrin değil; ileride teklif, portföy, içerik ve müşteri takibi
            büyüyebilecek şekilde tasarlanır.
          </p>
        </div>
        <div className="grid gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="border border-white/12 p-6">
                <Icon size={24} className="text-[#d7b36d]" />
                <p className="mt-5 text-xl font-semibold">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-white/64">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-16">
      <div className="site-container flex flex-col gap-6 border hairline bg-white p-5 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Ön görüşme</p>
          <h2 className="mt-2 text-3xl font-semibold">Talebi birkaç dakikada netleştirin.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/talep" className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
            Talep Formu <ArrowRight size={16} />
          </Link>
          <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 border hairline px-5 py-4 text-sm font-semibold">
            <Phone size={16} /> İletişim
          </Link>
        </div>
      </div>
    </section>
  );
}
