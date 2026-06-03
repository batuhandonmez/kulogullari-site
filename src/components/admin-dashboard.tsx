"use client";

import { useEffect, useMemo, useState } from "react";
import { LogOut, Plus, RefreshCw } from "lucide-react";
import type { Lead, LeadNote, LeadStatus } from "@/lib/lead-types";
import { statusLabels } from "@/lib/lead-types";

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const selectedLead = useMemo(() => leads.find((lead) => lead.id === selectedId) || leads[0], [leads, selectedId]);

  async function load() {
    const response = await fetch("/api/leads");
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    const data = await response.json();
    setLeads(data.leads || []);
    setSelectedId((current) => current || data.leads?.[0]?.id || "");
    setAuthenticated(true);

    const notesResponse = await fetch(`/api/admin/leads/${data.leads?.[0]?.id || "all"}/notes`);
    if (notesResponse.ok) {
      const notesData = await notesResponse.json();
      setNotes(notesData.notes || []);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(load);
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setMessage("Şifre hatalı.");
      return;
    }

    setMessage("");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setPassword("");
  }

  async function updateStatus(id: string, status: LeadStatus) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  async function addNote(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedLead || !note.trim()) return;

    await fetch(`/api/admin/leads/${selectedLead.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
    setNote("");
    await load();
  }

  if (!authenticated) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md border hairline bg-white p-5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Admin girişi</p>
        <h1 className="mt-3 text-3xl font-semibold">Talep paneli</h1>
        <p className="mt-3 text-sm leading-7 text-[#6b6760]">
          Demo şifre: <span className="font-semibold text-[#191816]">admin12345</span>. Yayında ADMIN_PASSWORD ile değiştirin.
        </p>
        <input
          className="focus-ring mt-6 w-full border hairline bg-[#fbfaf7] px-4 py-3 text-sm"
          type="password"
          placeholder="Admin şifresi"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {message ? <p className="mt-3 text-sm font-medium text-red-700">{message}</p> : null}
        <button className="mt-5 w-full bg-[#191816] px-5 py-4 text-sm font-semibold text-white">Giriş yap</button>
      </form>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="border hairline bg-white">
        <div className="flex items-center justify-between border-b hairline p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Talepler</p>
            <h1 className="text-2xl font-semibold">{leads.length} kayıt</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="grid size-10 place-items-center border hairline" aria-label="Yenile">
              <RefreshCw size={16} />
            </button>
            <button onClick={logout} className="grid size-10 place-items-center border hairline" aria-label="Çıkış">
              <LogOut size={16} />
            </button>
          </div>
        </div>
        <div className="max-h-[680px] overflow-auto">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedId(lead.id)}
              className={`block w-full border-b hairline p-5 text-left ${selectedLead?.id === lead.id ? "bg-[#f2eee6]" : "hover:bg-[#fbfaf7]"}`}
            >
              <p className="font-semibold">{lead.customer_name}</p>
              <p className="mt-1 text-sm text-[#6b6760]">{lead.sector} · {new Date(lead.created_at).toLocaleDateString("tr-TR")}</p>
              <span className="mt-3 inline-block border hairline px-3 py-1 text-xs font-semibold">{statusLabels[lead.status]}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="border hairline bg-white p-5 sm:p-6">
        {selectedLead ? (
          <>
            <div className="flex flex-col gap-4 border-b hairline pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Talep detayı</p>
                <h2 className="mt-2 text-3xl font-semibold">{selectedLead.customer_name}</h2>
                <p className="mt-2 text-sm text-[#6b6760]">{selectedLead.customer_phone} · {selectedLead.customer_email}</p>
              </div>
              <select
                className="focus-ring border hairline bg-[#fbfaf7] px-4 py-3 text-sm font-semibold"
                value={selectedLead.status}
                onChange={(event) => updateStatus(selectedLead.id, event.target.value as LeadStatus)}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Sektör" value={selectedLead.sector} />
              <Info label="Şehir" value={selectedLead.city || "-"} />
              {Object.entries(selectedLead.answers || {}).map(([key, value]) => (
                <Info key={key} label={key.replaceAll("_", " ")} value={value || "-"} />
              ))}
              <div className="border hairline p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Ek not</p>
                <p className="mt-2 text-sm leading-7 text-[#34312d]">{selectedLead.message || "-"}</p>
              </div>
            </div>

            <form onSubmit={addNote} className="mt-6 border-t hairline pt-6">
              <p className="text-sm font-semibold">Takip notu</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  className="focus-ring min-w-0 flex-1 border hairline bg-[#fbfaf7] px-4 py-3 text-sm"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Örn. Arandı, keşif için tarih beklenecek."
                />
                <button className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-3 text-sm font-semibold text-white">
                  <Plus size={16} /> Not ekle
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3">
              {notes.filter((item) => item.lead_id === selectedLead.id).map((item) => (
                <div key={item.id} className="border hairline bg-[#fbfaf7] p-4 text-sm">
                  <p>{item.note}</p>
                  <p className="mt-2 text-xs text-[#6b6760]">{new Date(item.created_at).toLocaleString("tr-TR")}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Henüz talep yok.</p>
        )}
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border hairline p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#34312d]">{value}</p>
    </div>
  );
}
