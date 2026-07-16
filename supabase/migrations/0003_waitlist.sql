-- Waitlist kampanii wiralowej — tylko e-mail + UTM (bez danych art. 9)
-- Patrz docs/marketing/social-virality-campaign.md sekcja 11

create table if not exists public.waitlist_signups (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  consent_marketing boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email),
  constraint waitlist_signups_consent_required check (consent_marketing = true)
);

comment on table public.waitlist_signups is 'Zapisy na waitlistę przed betą — wyłącznie e-mail i parametry UTM kampanii.';

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

create index if not exists waitlist_signups_utm_campaign_idx
  on public.waitlist_signups (utm_campaign, utm_source);

-- Brak polityk RLS dla anon — zapis wyłącznie przez API (service role).
alter table public.waitlist_signups enable row level security;
