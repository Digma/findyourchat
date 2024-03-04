
import type { Question } from './types.ts';
import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";


type WritingStyle = {
    id: string;
    name: string;
    questions: Question[];
};

const createDefaultNameFromQuestion = (questions: Question[]) => {
    const veryLowAnswers = questions.filter((q) => q.answer === 1).map((q) => q.attribute1.title);
    const veryHighAnswers = questions.filter((q) => q.answer === 5).map((q) => q.attribute2.title);
    const veryLowAndHighAnswers = veryLowAnswers.concat(veryHighAnswers);
    if (veryLowAndHighAnswers.length > 0) {
        return veryLowAnswers.slice(0, 3).join(" ");
    }

    const mediumLowAnswers = questions.filter((q) => q.answer === 2).map((q) => q.attribute1.title);
    const mediumHighAnswers = questions.filter((q) => q.answer === 4).map((q) => q.attribute2.title);
    const mediumLowAndHighAnswers = mediumLowAnswers.concat(mediumHighAnswers);
    if (mediumLowAndHighAnswers.length > 0) {
        return mediumLowAnswers.slice(0, 3).join(" ");
    }

    return "Perfectly Balanced as all things should be.";
}

export const getWritingStylesFromDB: () => Promise<WritingStyle[]> = async () => {
    const response = await fetch("/api/users/writing_styles", {
        method: "GET",
    });
    const responseJson = await response.json();
    const writingStyles = responseJson.map((r: any) => {
        return {
            id: r["id"],
            name: r["name"], 
            questions: JSON.parse(r["answers"]) as Question[],
        } as WritingStyle;
    });

    return writingStyles;
};

export const saveQuestionsToDB = async (questions: Question[], englishType: string) => {
    const allQuestionAnswered = checkIfAllQuestionsAnswered(questions);

    if (allQuestionAnswered) {
        const response = await fetch("/api/users/writing_styles", {
            method: "POST",
            body: JSON.stringify({
                name: createDefaultNameFromQuestion(questions),
                englishType: englishType,
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
