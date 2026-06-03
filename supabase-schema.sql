create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  sector text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  city text,
  message text,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'reviewing', 'quote', 'completed', 'cancelled')),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists lead_notes_lead_id_idx on public.lead_notes(lead_id);
