import type { APIRoute, AstroCookies } from "astro";

import { supabase } from "../../lib/supabase/supabase.ts";
import type { AuthError } from "@supabase/supabase-js";

const MISSING_TOKENS_ERROR = "Unauthorized: Missing Tokens";

const verifyToken = async (accessToken: string, refreshToken: string) => {
    // Verify the tokens
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    return { user, authError };
};

const authErrorResponse = (authError: AuthError) => {
    return new Response(
        JSON.stringify({
            error: authError.message,
        }),
        { status: 500 }
    );
};

export const GET: APIRoute = async ({ cookies }) => {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    // Check for tokens
    if (!accessToken || !refreshToken) {
        throw new Error(MISSING_TOKENS_ERROR);
    }

    const { user, authError } = await verifyToken(accessToken.value, refreshToken.value);
    if (authError) return authErrorResponse(authError);

    const { data, error } = await supabase
        .from("writing_styles")
        .select("id, answers, name")
        .eq("user_id", user?.id);

    if (error) {
        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            { status: 500 }
        );
    }

    return new Response(JSON.stringify(data));
};

export const PUT: APIRoute = async ({ request, cookies }) => {
    console.log("GOT UPDATE REQUEST");
    console.log("cookies", cookies);
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    // Check for tokens
    if (!accessToken || !refreshToken) {
        throw new Error(MISSING_TOKENS_ERROR);
    }

    const { user, authError } = await verifyToken(accessToken.value, refreshToken.value);
    if (authError) return authErrorResponse(authError);

    const { id, name } = await request.json();
    const { data, error: postgresError } = await supabase
        .from("writing_styles")
        .update({ name: name })
        .eq("id", id)
        .select();

    console.log("data", data);

    if (postgresError) {
        return new Response(
            JSON.stringify({
                error: postgresError.message,
            }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            message: "Success",
        }),
        { status: 200 }
    );
};

export const POST: APIRoute = async ({ request, cookies }) => {
    const accessToken = cookies.get("sb-access-token");
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser(accessToken?.value);

    const { questions, name } = await request.json();
    const { data, error: groupError } = await supabase.from("writing_styles").insert({
        user_id: user?.id,
        name: name,
        answers: JSON.stringify(questions),
    });

    console.log("error", groupError);
    console.log("data", data);
    if (groupError) {
        return new Response(
            JSON.stringify({
                error: groupError.message,
            }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            message: "Success",
        }),
        { status: 200 }
    );
};
