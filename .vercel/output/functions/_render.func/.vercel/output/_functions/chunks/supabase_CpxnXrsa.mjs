import { createClient } from '@supabase/supabase-js';

const url = "https://juwfxguicevpqtkhuofu.supabase.co";
const key = "sb_publishable_jkpYuESq1uu5fMNjrNKp3A_67IFsvOi";
const serviceKey = "your_service_role_key_here";
const supabase = createClient(url, key);
const supabaseAdmin = createClient(url, serviceKey);

export { supabase as a, supabaseAdmin as s };
