import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only when real values are in .env (placeholders don't start with http)
export const isSupabaseConfigured = Boolean(url && key && url.startsWith('http'))
export const supabase = isSupabaseConfigured ? createClient(url, key) : null