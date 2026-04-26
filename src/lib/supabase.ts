import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_KEY;
const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY;

export const supabase = createClient(url, key);

// Service role client untuk admin operations (server-side only)
export const supabaseAdmin = createClient(url, serviceKey || key);
