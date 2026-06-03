import Link from "next/link";
import { navItems } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-[#191816] text-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-[0.08em]">KULOĞULLARI</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
            İnşaat, araç kiralama, emlak, yazılım ve yeni faaliyet alanlarında güvenilir,
            kayıtlı ve takip edilebilir iş süreçleri.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/52">Site</p>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/52">İletişim</p>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            <span>Telefon: 05xx xxx xx xx</span>
            <span>E-posta: bilgi@kulogullari.com</span>
            <span>Türkiye genelinde proje değerlendirme</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="site-container flex flex-col gap-3 text-xs text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kuloğulları LTD. ŞTİ.</span>
          <span>Made by Batuhan Dönmez</span>
        </div>
      </div>
    </footer>
  );
}
