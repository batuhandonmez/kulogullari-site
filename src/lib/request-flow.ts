export type FieldType = "text" | "email" | "tel" | "number" | "textarea" | "select";

export type RequestField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export const sectorOptions = [
  { value: "insaat", label: "İnşaat ve Proje Geliştirme" },
  { value: "arac-kiralama", label: "Araç Kiralama ve Filo" },
  { value: "emlak", label: "Emlak ve Yatırım Danışmanlığı" },
  { value: "yazilim", label: "Yazılım, Web Tasarım ve Mobil Uygulama" },
  { value: "yatirim", label: "Yeni Faaliyet Alanı" },
];

const sharedContactFields: RequestField[] = [
  { name: "customer_name", label: "Ad Soyad", type: "text", required: true },
  { name: "customer_phone", label: "Telefon", type: "tel", required: true, placeholder: "05xx xxx xx xx" },
  { name: "customer_email", label: "E-posta", type: "email", required: true },
  { name: "city", label: "Şehir / İlçe", type: "text", required: true },
  { name: "message", label: "Ek not", type: "textarea", placeholder: "Paylaşmak istediğiniz özel detaylar" },
];

export const sectorFields: Record<string, RequestField[]> = {
  insaat: [
    { name: "yapi_tipi", label: "Yapı tipi", type: "select", required: true, options: ["Yazlık müstakil ev", "Villa", "Ticari yapı", "Tadilat / yenileme", "Diğer"] },
    { name: "kullanim_amaci", label: "Kullanım amacı", type: "select", required: true, options: ["Kişisel kullanım", "Yatırım", "Kiralama", "Aile kullanımı"] },
    { name: "arsa_durumu", label: "Arsa durumu", type: "select", required: true, options: ["Arsa hazır", "Arsa araştırılıyor", "Mevcut yapı var", "Henüz net değil"] },
    { name: "metrekare", label: "Yaklaşık metrekare", type: "number", required: true },
    { name: "oda_sayisi", label: "Oda sayısı", type: "select", options: ["1+1", "2+1", "3+1", "4+1", "5+1 ve üzeri"] },
    { name: "kat_sayisi", label: "Kat sayısı", type: "select", options: ["Tek kat", "2 kat", "3 kat", "Net değil"] },
    { name: "kalite", label: "Malzeme / kalite tercihi", type: "select", required: true, options: ["Standart", "Üst segment", "Premium", "Kararsızım"] },
    { name: "butce", label: "Bütçe aralığı", type: "select", options: ["1-3 milyon TL", "3-6 milyon TL", "6-10 milyon TL", "10 milyon TL üzeri", "Net değil"] },
  ],
  "arac-kiralama": [
    { name: "arac_tipi", label: "Araç tipi", type: "select", required: true, options: ["Ekonomik", "Sedan", "SUV", "Ticari", "Lüks", "Filo"] },
    { name: "sure", label: "Kiralama süresi", type: "select", required: true, options: ["Günlük", "Haftalık", "Aylık", "Uzun dönem", "Net değil"] },
    { name: "kullanim", label: "Kullanım tipi", type: "select", required: true, options: ["Bireysel", "Kurumsal", "Proje bazlı", "Turizm / transfer"] },
    { name: "adet", label: "Araç adedi", type: "number", required: true },
    { name: "teslim", label: "Teslim tercihi", type: "select", options: ["Ofisten teslim", "Adrese teslim", "Havalimanı", "Görüşülecek"] },
  ],
  emlak: [
    { name: "islem", label: "İşlem tipi", type: "select", required: true, options: ["Satın alma", "Satış", "Kiralama", "Yatırım danışmanlığı"] },
    { name: "mulk_tipi", label: "Mülk tipi", type: "select", required: true, options: ["Konut", "Villa", "Arsa", "Ticari", "Yazlık", "Diğer"] },
    { name: "lokasyon", label: "Hedef lokasyon", type: "text", required: true },
    { name: "butce", label: "Bütçe / değer aralığı", type: "select", options: ["1-3 milyon TL", "3-6 milyon TL", "6-10 milyon TL", "10 milyon TL üzeri", "Net değil"] },
    { name: "ozellikler", label: "Beklenen özellikler", type: "textarea", placeholder: "Oda sayısı, cephe, arsa m2, manzara gibi detaylar" },
  ],
  yazilim: [
    { name: "hizmet_tipi", label: "Hizmet tipi", type: "select", required: true, options: ["Kurumsal web sitesi", "Web tasarım", "Mobil uygulama", "Yönetim paneli", "Özel yazılım", "Bakım / geliştirme"] },
    { name: "proje_amaci", label: "Proje amacı", type: "select", required: true, options: ["Yeni marka sitesi", "Mevcut site yenileme", "Talep / randevu sistemi", "E-ticaret", "İç operasyon yazılımı", "Henüz net değil"] },
    { name: "platform", label: "Hedef platform", type: "select", options: ["Web", "iOS", "Android", "Web + mobil", "Admin panel", "Kararsızım"] },
    { name: "icerik_durumu", label: "İçerik / görsel durumu", type: "select", options: ["Hazır", "Kısmen hazır", "Profesyonel destek gerekli", "Henüz yok"] },
    { name: "zamanlama", label: "Planlanan zamanlama", type: "select", options: ["Acil", "1 ay içinde", "1-3 ay", "3 ay üzeri"] },
    { name: "butce", label: "Bütçe aralığı", type: "select", options: ["10-25 bin TL", "25-50 bin TL", "50-100 bin TL", "100 bin TL üzeri", "Net değil"] },
    { name: "detay", label: "Proje detayı", type: "textarea", required: true, placeholder: "İstenen sayfalar, örnek siteler, kullanıcı rolleri veya özel iş akışı" },
  ],
  yatirim: [
    { name: "alan", label: "İlgilenilen alan", type: "text", required: true },
    { name: "amac", label: "Görüşme amacı", type: "select", required: true, options: ["İş ortaklığı", "Hizmet talebi", "Yatırım görüşmesi", "Tedarik / operasyon"] },
    { name: "zamanlama", label: "Planlanan zamanlama", type: "select", options: ["Hemen", "1-3 ay", "3-6 ay", "6 ay üzeri"] },
    { name: "detay", label: "Kısa açıklama", type: "textarea", required: true },
  ],
};

export const contactFields = sharedContactFields;
