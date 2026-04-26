import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_KEY;
const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY;

export const supabase = createClient(url, key);

// Admin client — pakai service key kalau ada, fallback ke anon key
// Kalau pakai anon key, RLS harus allow semua reads
export const supabaseAdmin = serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : createClient(url, key);
