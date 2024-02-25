
import type { Question } from './types.ts';
//import type { Json } from "../supabase/types.ts";
import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";


export const getQuestionsFromDB = async () => {
    const response = await fetch("/api/personalities", {
        method: "GET",
    });
    //console.log("response: ", await response.json());
    const responseJson = await response.json();
    console.log("responseJson: ", responseJson);
    const questions = responseJson.map((r: any) => JSON.parse(r["answers"]) as Question);
    console.log("questions: ", questions);
    return questions;
};

export const saveQuestionsToDB = async (questions: Question[]) => {
    const allQuestionAnswered = checkIfAllQuestionsAnswered(questions);

    if (allQuestionAnswered) {
        const response = await fetch("/api/personalities", {
            method: "POST",
            body: JSON.stringify({
                questions: questions,
            }),
        });

        return response;
    } else {
        return new Response(
            JSON.stringify({
                error: "Not all questions answered",
            }),
            { status: 400 }
        );
    }
};
