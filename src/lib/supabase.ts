import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL || '';
const key = import.meta.env.SUPABASE_KEY
  || import.meta.env.SUPABASE_ANON_KEY
  || import.meta.env.SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || '';

const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY
  || import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  || import.meta.env.SUPABASE_SECRET_KEY
  || '';

if (!url || !key) {
  console.warn('Missing Supabase environment variables:', { hasUrl: !!url, hasKey: !!key });
}

export const supabase = url && key ? createClient(url, key) : null as any;

export const supabaseAdmin = url && (serviceKey || key)
  ? createClient(url, serviceKey || key, { auth: { persistSession: false } })
  : null as any;
