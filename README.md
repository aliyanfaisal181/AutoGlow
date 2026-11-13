# AutoGlow

A premium car detailing website: interactive hero, services, packages, a real booking system, before/after gallery, reviews, FAQ and contact form.

**Stack:** React · Vite · Tailwind CSS · Supabase (Postgres) · Lucide icons

## Features
- Booking flow with validation. Bookings are saved to Supabase, and taken time slots are disabled for other visitors.
- Contact form saved to Supabase.
- Row Level Security: visitors can add bookings and messages but can never read them.
- WhatsApp quick-contact links, accessible forms and keyboard navigation, responsive layout, reduced-motion support.

## Run locally
    npm install
    cp .env.example .env     # then fill in your Supabase URL and anon key
    npm run dev

## Set up Supabase
1. Create a free project at supabase.com.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Copy the Project URL and anon/publishable key (Project Settings > API) into `.env`.
Never use the service_role key in this project.

## Customise
- Business details: `src/data/siteConfig.js`
- Services, packages, FAQs, reviews, gallery: `src/data/`
- Artwork: `node scripts/generate-images.mjs`, or replace with real photos