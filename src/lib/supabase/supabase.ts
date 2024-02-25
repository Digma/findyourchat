import { createClient } from "@supabase/supabase-js";
import type { Database } from './types'

export const supabase = createClient<Database>(
  // import.meta.env.SUPABASE_URL,
  // import.meta.env.SUPABASE_ANON_KEY,
  "https://vvojfealyapeoegduhie.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2b2pmZWFseWFwZW9lZ2R1aGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDA1MTAsImV4cCI6MjAyMjExNjUxMH0.sLqK1AkdQ3NLBAOfes3GW9GsKbnQW7GqhlAAk0deK1M",
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
    },
  },
);
