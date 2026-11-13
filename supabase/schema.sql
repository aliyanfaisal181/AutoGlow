-- AutoGlow database schema. Run this once in the Supabase SQL Editor.

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  package_id text not null check (package_id in ('essential','signature','elite')),
  booking_date date not null,
  time_slot text not null check (time_slot in ('09:00','11:00','13:00','15:00')),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 30),
  email text check (email is null or char_length(email) <= 200),
  car text not null check (char_length(car) between 2 and 100),
  notes text check (notes is null or char_length(notes) <= 1000),
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled'))
);

-- A slot can only be taken once (cancelled bookings free it up again)
create unique index bookings_one_per_slot
  on public.bookings (booking_date, time_slot)
  where status <> 'cancelled';

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 30),
  message text not null check (char_length(message) between 10 and 2000)
);

-- Row Level Security: visitors can only ADD rows, never read anyone's details
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

create policy "Visitors can request a booking"
  on public.bookings for insert to anon
  with check (status = 'pending');

create policy "Visitors can send a message"
  on public.contact_messages for insert to anon
  with check (true);

-- Lets the website grey out taken slots without exposing personal data
create or replace function public.get_taken_slots(from_date date)
returns table (booking_date date, time_slot text)
language sql security definer set search_path = public as $$
  select booking_date, time_slot from public.bookings
  where status <> 'cancelled' and booking_date >= from_date;
$$;
grant execute on function public.get_taken_slots(date) to anon;