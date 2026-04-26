import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
// Support berbagai nama env var yang mungkin dipakai
const key = import.meta.env.SUPABASE_KEY 
  || import.meta.env.SUPABASE_ANON_KEY 
  || import.meta.env.SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY 
  || import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  || import.meta.env.SUPABASE_SECRET_KEY;

export const supabase = createClient(url, key);

// Admin client — pakai service key kalau ada, fallback ke anon key
export const supabaseAdmin = serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : createClient(url, key);
