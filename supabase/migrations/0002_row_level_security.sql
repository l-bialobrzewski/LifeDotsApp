-- LifeDots — Row Level Security
-- Krytyczne dla izolacji danych szczegolnej kategorii (art. 9 RODO) - patrz docs/dpia.md
-- Zasada: kazdy uzytkownik widzi i modyfikuje WYLACZNIE wlasne wiersze.

alter table public.profiles enable row level security;
alter table public.dot_entries enable row level security;
alter table public.consents enable row level security;
alter table public.data_requests enable row level security;

-- profiles ------------------------------------------------------------------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- insert obslugiwany przez trigger handle_new_user (security definer),
-- dlatego brak polityki insert dla uzytkownikow koncowych.

-- dot_entries -----------------------------------------------------------------
drop policy if exists "dot_entries_select_own" on public.dot_entries;
create policy "dot_entries_select_own"
  on public.dot_entries for select
  using (auth.uid() = user_id);

drop policy if exists "dot_entries_insert_own" on public.dot_entries;
create policy "dot_entries_insert_own"
  on public.dot_entries for insert
  with check (auth.uid() = user_id);

drop policy if exists "dot_entries_update_own" on public.dot_entries;
create policy "dot_entries_update_own"
  on public.dot_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "dot_entries_delete_own" on public.dot_entries;
create policy "dot_entries_delete_own"
  on public.dot_entries for delete
  using (auth.uid() = user_id);

-- consents --------------------------------------------------------------------
drop policy if exists "consents_select_own" on public.consents;
create policy "consents_select_own"
  on public.consents for select
  using (auth.uid() = user_id);

drop policy if exists "consents_insert_own" on public.consents;
create policy "consents_insert_own"
  on public.consents for insert
  with check (auth.uid() = user_id);

drop policy if exists "consents_update_own" on public.consents;
create policy "consents_update_own"
  on public.consents for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- data_requests -----------------------------------------------------------------
drop policy if exists "data_requests_select_own" on public.data_requests;
create policy "data_requests_select_own"
  on public.data_requests for select
  using (auth.uid() = user_id);

drop policy if exists "data_requests_insert_own" on public.data_requests;
create policy "data_requests_insert_own"
  on public.data_requests for insert
  with check (auth.uid() = user_id);
