export const prerender = false;
import { supabase } from "../../lib/supabase/supabase.ts";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = (formData.get("email") || "").toString();

  // Case empty email
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required field email",
      }),
      { status: 400 }
    );
  }

  const { data, error: groupError } = await supabase
        .from("email_registration")
        .insert({
            email_address: email,
        });
  
  // Case error
  if (groupError) {
    return new Response(
      JSON.stringify({
        message: "Internal Error. Email may already be registered."
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Success"
    }),
    { status: 200 }
  );
};