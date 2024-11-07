import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICEROLE_KEY } from "$env/static/public";

export const db = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICEROLE_KEY);
