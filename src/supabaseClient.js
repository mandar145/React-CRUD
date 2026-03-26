import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://buidadkcznactyqnczkd.supabase.co";
const supabaseKey = "sb_publishable_RUxiASrCRzsSgr67N9J6dg_fipa5tez";
export const supabase = createClient(supabaseUrl, supabaseKey);
