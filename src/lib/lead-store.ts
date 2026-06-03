import { Resend } from "resend";
import type { Lead, LeadNote, LeadStatus } from "./lead-types";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase";

type LeadInput = Omit<Lead, "id" | "created_at" | "status" | "source">;

const demoLead: Lead = {
  id: "demo-1001",
  sector: "insaat",
  customer_name: "Demo Müşteri",
  customer_email: "demo@example.com",
  customer_phone: "0555 000 00 00",
  city: "Muğla / Bodrum",
  message: "Yazlık müstakil ev için ön görüşme talebi.",
  answers: {
    yapi_tipi: "Yazlık müstakil ev",
    metrekare: "180",
    kalite: "Üst segment",
    butce: "6-10 milyon TL",
  },
  status: "new",
  source: "website-demo",
  created_at: new Date().toISOString(),
};

const memory = globalThis as typeof globalThis & {
  __kulogullariLeads?: Lead[];
  __kulogullariNotes?: LeadNote[];
};

function leads() {
  memory.__kulogullariLeads ??= [demoLead];
  return memory.__kulogullariLeads;
}

function notes() {
  memory.__kulogullariNotes ??= [];
  return memory.__kulogullariNotes;
}

export async function createLead(input: LeadInput) {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    source: hasSupabaseConfig() ? "website" : "website-demo",
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        sector: lead.sector,
        customer_name: lead.customer_name,
        customer_email: lead.customer_email,
        customer_phone: lead.customer_phone,
        city: lead.city,
        message: lead.message,
        answers: lead.answers,
        status: lead.status,
        source: lead.source,
      })
      .select("*")
      .single();

    if (error) throw error;
    await sendLeadEmail(data as Lead);
    return data as Lead;
  }

  leads().unshift(lead);
  await sendLeadEmail(lead);
  return lead;
}

export async function listLeads() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return leads();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Lead[];
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const lead = leads().find((item) => item.id === id);
    if (lead) lead.status = status;
    return lead;
  }

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function addLeadNote(leadId: string, note: string) {
  const entry: LeadNote = {
    id: crypto.randomUUID(),
    lead_id: leadId,
    note,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    notes().unshift(entry);
    return entry;
  }

  const { data, error } = await supabase
    .from("lead_notes")
    .insert({ lead_id: leadId, note })
    .select("*")
    .single();

  if (error) throw error;
  return data as LeadNote;
}

export async function listLeadNotes() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return notes();

  const { data, error } = await supabase
    .from("lead_notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as LeadNote[];
}

async function sendLeadEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  const rows = Object.entries(lead.answers)
    .map(([key, value]) => `<tr><td style="padding:6px 12px;color:#6b6760">${key}</td><td style="padding:6px 12px">${value}</td></tr>`)
    .join("");

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Kuloğulları <onboarding@resend.dev>",
    to,
    subject: `Yeni talep: ${lead.customer_name}`,
    html: `<h2>Yeni web sitesi talebi</h2><p><strong>${lead.customer_name}</strong> - ${lead.customer_phone}</p><p>${lead.customer_email}</p><p>Sektör: ${lead.sector}</p><table>${rows}</table><p>${lead.message || ""}</p>`,
  });
}
