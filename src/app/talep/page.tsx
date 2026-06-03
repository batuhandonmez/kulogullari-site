import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { RequestWizard } from "@/components/request-wizard";

export const metadata = {
  title: "Talep Oluştur",
};

export default function RequestPage() {
  return (
    <PageShell>
      <section className="border-b hairline py-12 md:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Talep oluştur"
            title="Seçenekleri belirleyin, ekip fiyat teklifi için düzenli bilgi alsın."
            text="Form sektörünüze göre değişir. Gönderilen talep kayıt altına alınır ve admin panelinde takip edilebilir."
          />
        </div>
      </section>
      <section className="py-10 md:py-16">
        <div className="site-container">
          <Suspense fallback={<div className="border hairline bg-white p-8">Form hazırlanıyor...</div>}>
            <RequestWizard />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
