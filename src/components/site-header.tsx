"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-[#f7f5f1]/92 backdrop-blur">
      <div className="site-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center border border-[#191816] bg-[#191816] text-sm font-semibold text-white sm:size-11">
            K
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold tracking-[0.08em] sm:text-lg">KULOĞULLARI</span>
            <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6760]">
              LTD. ŞTİ.
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#4d4943] lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#191816]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/talep"
            className="hidden items-center gap-2 border border-[#191816] bg-[#191816] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2b2926] sm:flex"
          >
            Talep Oluştur
            <ArrowRight size={16} />
          </Link>
          <button
            className="grid size-11 place-items-center border hairline lg:hidden"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t hairline bg-[#f7f5f1] lg:hidden">
          <div className="site-container grid gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b hairline px-1 py-4 text-sm font-semibold text-[#34312d]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/talep"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#191816] px-4 py-4 text-sm font-semibold text-white"
            >
              Talep Oluştur
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
