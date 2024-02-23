import { supabase } from "../../lib/supabase/supabase.ts";
import type { Question } from "../personality/types";


export const submitWritingStyle = async (questions: Question[], userId: number) => {
    const {data, error: groupError} = await supabase
      .from("writing_styles")
      .insert({
        created_by: userId,
        answers: JSON.stringify(questions),
      })
      .select("created_by")
      .single()

    if (groupError) {
      console.error(groupError)
      return
    }

    if (!data) {
      console.error("No data returned")
      return
    }

    // const { error: membersError} = await supabase
    //   .from("members")
    //   .insert(members.map((name) => ({ name, selected_by: null, group_id: data.id })))
    // if (membersError) {
    //   console.error(membersError)
    //   return
    // }
    // window.location.href = `/${data.id}?user=${yourName}`
};

export const fetchWritingStyle = async (userId: number) => {
    const { data, error } = await supabase
        .from("writing_styles")
        .select("answers")
        .eq("created_by", userId);
    
    if (error) {
        console.error(error);
        throw error;
        }
    
    return data;
}
