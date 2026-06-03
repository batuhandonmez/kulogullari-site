"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { contactFields, sectorFields, sectorOptions, type RequestField } from "@/lib/request-flow";

type FormState = Record<string, string>;

function Field({ field, value, onChange }: { field: RequestField; value: string; onChange: (value: string) => void }) {
  const className =
    "focus-ring w-full border hairline bg-[#fbfaf7] px-4 py-3 text-sm text-[#191816] placeholder:text-[#9a958c]";

  if (field.type === "select") {
    return (
      <select className={className} value={value} required={field.required} onChange={(event) => onChange(event.target.value)}>
        <option value="">Seçiniz</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        className={`${className} min-h-32 resize-y`}
        value={value}
        required={field.required}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      className={className}
      type={field.type}
      value={value}
      required={field.required}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function RequestWizard() {
  const params = useSearchParams();
  const initialSector = params.get("sector") || "insaat";
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState(sectorFields[initialSector] ? initialSector : "insaat");
  const [form, setForm] = useState<FormState>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const fields = useMemo(() => sectorFields[sector] || sectorFields.insaat, [sector]);
  const steps = ["Sektör", "Detaylar", "İletişim", "Onay"];

  function setValue(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate(fieldsToValidate: RequestField[]) {
    return fieldsToValidate.every((field) => !field.required || String(form[field.name] || "").trim().length > 0);
  }

  function next() {
    if (step === 1 && !validate(fields)) {
      setMessage("Lütfen zorunlu proje alanlarını doldurun.");
      return;
    }
    if (step === 2 && !validate(contactFields)) {
      setMessage("Lütfen iletişim bilgilerini eksiksiz doldurun.");
      return;
    }
    setMessage("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit() {
    setStatus("loading");
    setMessage("");

    const contact = Object.fromEntries(contactFields.map((field) => [field.name, form[field.name] || ""]));
    const answers = Object.fromEntries(fields.map((field) => [field.name, form[field.name] || ""]));

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sector, ...contact, answers }),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Talep kaydedilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.");
      return;
    }

    setStatus("success");
    setMessage("Talebiniz kaydedildi. Ekip ön değerlendirme için sizinle iletişime geçecek.");
  }

  return (
    <div className="border hairline bg-white">
      <div className="grid border-b hairline sm:grid-cols-4">
        {steps.map((item, index) => (
          <div key={item} className={`border-b hairline p-3 text-sm font-semibold sm:border-b-0 sm:border-r sm:p-4 ${index === step ? "bg-[#191816] text-white" : "text-[#6b6760]"}`}>
            <span className="mr-2 text-xs">0{index + 1}</span>
            {item}
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6 md:p-9">
        {step === 0 ? (
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Hangi alan için talep oluşturuyorsunuz?</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {sectorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSector(option.value)}
                  className={`focus-ring border p-4 text-left transition sm:p-5 ${sector === option.value ? "border-[#191816] bg-[#f2eee6]" : "hairline bg-white hover:bg-[#fbfaf7]"}`}
                >
                  <span className="text-lg font-semibold">{option.label}</span>
                  <span className="mt-3 block text-sm leading-6 text-[#6b6760]">
                    Seçilen sektöre göre sonraki adımda farklı bilgiler istenir.
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Talep detayları</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <span className="mb-2 block text-sm font-semibold text-[#34312d]">
                    {field.label} {field.required ? <span className="text-[#9b783e]">*</span> : null}
                  </span>
                  <Field field={field} value={form[field.name] || ""} onChange={(value) => setValue(field.name, value)} />
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">İletişim bilgileri</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {contactFields.map((field) => (
                <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <span className="mb-2 block text-sm font-semibold text-[#34312d]">
                    {field.label} {field.required ? <span className="text-[#9b783e]">*</span> : null}
                  </span>
                  <Field field={field} value={form[field.name] || ""} onChange={(value) => setValue(field.name, value)} />
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Özet ve onay</h2>
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <div className="border hairline p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">Sektör</p>
                <p className="mt-2 text-lg font-semibold">{sectorOptions.find((item) => item.value === sector)?.label}</p>
              </div>
              {[...fields, ...contactFields].filter((field) => form[field.name]).map((field) => (
                <div key={field.name} className="border hairline p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b783e]">{field.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#34312d]">{form[field.name]}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {message ? (
          <div className={`mt-6 border p-4 text-sm font-medium ${status === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-[#d8c8ac] bg-[#fbfaf7] text-[#6b4d21]"}`}>
            {message}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            disabled={step === 0 || status === "loading"}
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className="inline-flex items-center justify-center gap-2 border hairline px-5 py-4 text-sm font-semibold disabled:opacity-40"
          >
            <ArrowLeft size={16} /> Geri
          </button>
          {step < 3 ? (
            <button type="button" onClick={next} className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white">
              Devam <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "loading" || status === "success"}
              className="inline-flex items-center justify-center gap-2 bg-[#191816] px-5 py-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Talebi Gönder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
