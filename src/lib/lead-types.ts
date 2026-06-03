export type LeadStatus = "new" | "reviewing" | "quote" | "completed" | "cancelled";

export type Lead = {
  id: string;
  sector: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city?: string;
  message?: string;
  answers: Record<string, string>;
  status: LeadStatus;
  source: string;
  created_at: string;
};

export type LeadNote = {
  id: string;
  lead_id: string;
  note: string;
  created_at: string;
};

export const statusLabels: Record<LeadStatus, string> = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  quote: "Teklif hazırlanıyor",
  completed: "Tamamlandı",
  cancelled: "İptal",
};
