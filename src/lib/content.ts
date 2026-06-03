import {
  Building2,
  Car,
  ClipboardCheck,
  Code2,
  Home,
  LandPlot,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/sektorler", label: "Sektörler" },
  { href: "/projeler", label: "Portföy" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/iletisim", label: "İletişim" },
];

export const sectors = [
  {
    slug: "insaat",
    title: "İnşaat ve Proje Geliştirme",
    short: "Müstakil ev, yazlık, ticari alan ve anahtar teslim proje koordinasyonu.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    points: ["Keşif ve ihtiyaç analizi", "Malzeme kalite seçenekleri", "Teklif ve süreç takibi"],
  },
  {
    slug: "arac-kiralama",
    title: "Araç Kiralama ve Filo",
    short: "Bireysel, kurumsal ve dönemsel araç ihtiyaçları için planlı çözümler.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1400&q=80",
    points: ["Kısa ve uzun dönem kiralama", "Kurumsal filo planlama", "Teslim ve operasyon desteği"],
  },
  {
    slug: "emlak",
    title: "Emlak ve Yatırım Danışmanlığı",
    short: "Konut, arsa ve ticari mülk ihtiyaçlarında güvenilir portföy yönetimi.",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
    points: ["Alım, satım ve kiralama", "Lokasyon odaklı analiz", "Yatırım fırsatı değerlendirme"],
  },
  {
    slug: "yazilim",
    title: "Yazılım, Web Tasarım ve Mobil Uygulama",
    short: "Kurumsal web siteleri, özel yazılım çözümleri ve mobil uygulama geliştirme hizmetleri.",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    points: ["Modern web sitesi geliştirme", "Mobil uygulama ve panel çözümleri", "Bakım, yayın ve teknik destek"],
  },
  {
    slug: "yatirim",
    title: "Yeni Faaliyet Alanları",
    short: "Şirketin büyüyen operasyonları için esnek ve ölçeklenebilir hizmet modeli.",
    icon: LandPlot,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    points: ["Ortaklık görüşmeleri", "Saha araştırması", "Operasyonel hazırlık"],
  },
];

export const projects = [
  {
    title: "Yazlık Müstakil Ev Konsepti",
    category: "İnşaat",
    location: "Ege ve Akdeniz bölgeleri",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    description:
      "Arsa durumuna, metrekareye ve malzeme tercihine göre tekliflendirilebilen anahtar teslim konut yaklaşımı.",
  },
  {
    title: "Kurumsal Araç Planlama",
    category: "Araç Kiralama",
    location: "Şehir içi ve şehirler arası operasyon",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    description:
      "Dönemsel ekip ihtiyaçlarına göre araç sınıfı, süre ve teslim planı oluşturan filo süreci.",
  },
  {
    title: "Konut ve Arsa Portföyü",
    category: "Emlak",
    location: "Gelişen yatırım bölgeleri",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    description:
      "Kullanım amacı ve bütçe aralığına göre kısa liste hazırlayan danışmanlık modeli.",
  },
  {
    title: "Kurumsal Web ve Talep Yönetimi",
    category: "Yazılım",
    location: "Web, panel ve otomasyon",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    description:
      "İşletmeler için mobil uyumlu web sitesi, talep formu, yönetim paneli ve yayın sonrası teknik destek yaklaşımı.",
  },
];

export const processSteps = [
  "İhtiyaç ve sektör seçimi",
  "Detaylı seçeneklerin belirlenmesi",
  "Talebin ekibe iletilmesi",
  "Ön değerlendirme ve fiyat teklifi",
];

export const trustItems = [
  { icon: ShieldCheck, label: "Güvenilir süreç", text: "Her talep kayıt altına alınır ve takip edilir." },
  { icon: ClipboardCheck, label: "Net teklif hazırlığı", text: "İhtiyaca göre alanlar toplanır, eksik bilgi azalır." },
  { icon: Smartphone, label: "Dijital hizmet gücü", text: "Web, mobil ve yazılım ihtiyaçları aynı profesyonel akışa dahil edilir." },
];
