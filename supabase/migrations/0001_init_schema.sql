-- LifeDots — schemat poczatkowy
-- Patrz docs/spec.md (model danych) i docs/dpia.md (klasyfikacja danych, szyfrowanie)

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- profiles: dane konta + parametry siatki zycia
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  birth_date date,
  life_expectancy_years smallint not null default 90 check (life_expectancy_years between 1 and 130),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Profil uzytkownika i parametry wizualizacji siatki zycia.';

-- ---------------------------------------------------------------------------
-- dot_entries: wpisy nastroju/wydarzen per dzien
-- UWAGA (RODO art. 9): note jest szyfrowana po stronie aplikacji przed zapisem
-- (patrz lib/encryption.ts). Baza przechowuje jedynie ciphertext w note_encrypted.
-- ---------------------------------------------------------------------------
create table if not exists public.dot_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  entry_date date not null,
  mood_value smallint check (mood_value between 1 and 5),
  note_encrypted text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

comment on table public.dot_entries is 'Wpis nastroju/wydarzenia dla jednego dnia. Dane szczegolnej kategorii (art. 9 RODO) - patrz docs/dpia.md.';
comment on column public.dot_entries.note_encrypted is 'Notatka zaszyfrowana AES-256-GCM po stronie aplikacji przed zapisem (nigdy plaintext w DB).';

create index if not exists dot_entries_user_id_idx on public.dot_entries (user_id);
create index if not exists dot_entries_user_date_idx on public.dot_entries (user_id, entry_date);

-- ---------------------------------------------------------------------------
-- consents: audytowalny log zgod (art. 7(1) RODO - obowiazek wykazania zgody)
-- ---------------------------------------------------------------------------
create table if not exists public.consents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  consent_type text not null, -- np. 'health_mood_data', 'marketing_email'
  policy_version text not null,
  granted_at timestamptz,
  withdrawn_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.consents is 'Log zgod uzytkownika, w tym wyraznej zgody art. 9(2)(a) na dane o nastroju/zdrowiu.';

create index if not exists consents_user_id_idx on public.consents (user_id);

-- ---------------------------------------------------------------------------
-- data_requests: kolejka realizacji praw podmiotu danych (eksport / usuniecie)
-- ---------------------------------------------------------------------------
create table if not exists public.data_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  request_type text not null check (request_type in ('export', 'delete')),
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  requested_at timestamptz not null default now(),
  completed_at timestamptz
);

comment on table public.data_requests is 'Audytowalny log realizacji praw dostepu/eksportu/usuniecia danych (art. 15, 17, 20 RODO).';

-- ---------------------------------------------------------------------------
-- trigger: auto-tworzenie profilu przy rejestracji
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- trigger: updated_at
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists dot_entries_set_updated_at on public.dot_entries;
create trigger dot_entries_set_updated_at
  before update on public.dot_entries
  for each row execute procedure public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
