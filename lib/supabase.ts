
import { supabasePublishableKey, supabaseUrl } from "@/constant";
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
      supabaseUrl,
      supabasePublishableKey,
);
