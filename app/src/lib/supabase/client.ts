import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "./api";

export const supabase = createClient(
	supabaseUrl,
	supabaseKey
);