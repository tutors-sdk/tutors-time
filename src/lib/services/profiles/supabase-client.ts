import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICEROLE_KEY } from "$env/static/public";

export const supabase: SupabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICEROLE_KEY);
