import type { APIRoute, AstroCookies } from "astro";

import { supabase } from "../../lib/supabase/supabase.ts";
import type { AuthError } from "@supabase/supabase-js";

const validateUser = async ( cookies: AstroCookies ) => {
    const accessToken = cookies.get("sb-access-token");
    // Verify the tokens
    const {
        data: { user },
        error: authError
    } = await supabase.auth.getUser(accessToken?.value);

    return { user, authError };
}

const authErrorResponse = (authError: AuthError) => {
    return new Response(
        JSON.stringify({
            error: authError.message,
        }),
        { status: 500 }
    );
}

export const GET: APIRoute = async ({ cookies }) => {
    const { user, authError } = await validateUser(cookies);
    if (authError) return authErrorResponse(authError);

    const { data, error } = await supabase
        .from("writing_styles")
        .select("answers")
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

export const POST: APIRoute = async ({ request, cookies }) => {
    const accessToken = cookies.get("sb-access-token");
    const {
        data: { user },
        error
    } = await supabase.auth.getUser(accessToken?.value);
    console.log("user", user);
    console.log("errorAuth", error);

    const { questions } = await request.json();
    const { data, error: groupError } = await supabase
        .from("writing_styles")
        .insert({
            user_id: user?.id,
            answers: JSON.stringify(questions),
        })
    
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
        message: "Success"
    }),
    { status: 200 }
    );
};

    // export const submitWritingStyle = async (questions: Question[]) => {
    //     const { data: { user } } = await supabase.auth.getUser();
    //     console.log(user);

    //     const {data, error: groupError} = await supabase
    //       .from("writing_styles")
    //       .insert({
    //         user_id: user,
    //         answers: JSON.stringify(questions),
    //       })
    //       .select("user_id")
    //       .single()

    //     if (groupError) {
    //       console.error(groupError)
    //       return
    //     }

    //     if (!data) {
    //       console.error("No data returned")
    //       return
    //     }

    // const { error: membersError} = await supabase
    //   .from("members")
    //   .insert(members.map((name) => ({ name, selected_by: null, group_id: data.id })))
    // if (membersError) {
    //   console.error(membersError)
    //   return
    // }
    // window.location.href = `/${data.id}?user=${yourName}`
    //};

// export const fetchWritingStyle = async (userId: string) => {
//     const { data, error } = await supabase
//         .from("writing_styles")
//         .select("answers")
//         .eq("user_id", userId);

//     if (error) {
//         console.error(error);
//         throw error;
//         }

//     return data;
// }
