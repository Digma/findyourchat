import type { Question } from './types';
import { allQuestions } from "../../lib/personality/questions.ts";
import { WritingStyleDocument } from './dataConverter';


export const encodeAnswerToResultUrl = (writingStyle: WritingStyleDocument) => {
    // Initialize the query parameters string
    let queryParams = [];
    
    // Add each item in the list variable to the query string
    writingStyle.answers.forEach((answer, index) => {
        if (answer) {
            queryParams.push(`answer${index}=${encodeURIComponent(answer.answer || "")}`);
        }
    });

    // Add the string variable to the query string
    if (writingStyle.englishType) {
        queryParams.push(`englishType=${encodeURIComponent(writingStyle.englishType)}`);
    }

    if (writingStyle.id) {
        queryParams.push(`id=${encodeURIComponent(writingStyle.id)}`);
    }

    if (writingStyle.name) {
        queryParams.push(`name=${encodeURIComponent(writingStyle.name)}`);
    }

    // Concatenate the base URL with the encoded query parameters
    return `/results?${queryParams.join("&")}`;
};

export const decodeUrlToAnswer = (url: string) => {
    const urlParams = new URLSearchParams(url);
    const answers: number[] = [];

    for (let i = 0; i < 10; i++) {
        const answer = urlParams.get(`answer${i}`);
        if (answer) {
            answers.push(parseInt(answer));
        }
    }
    const englishType = urlParams.get('englishType') || '';
    const id = urlParams.get('id') || '';
    const name = urlParams.get('name') || '';

    return { answers, englishType, id, name };
}


export const urlToWritingStyle = (url: string) => {
    const { answers, englishType, id, name } = decodeUrlToAnswer(url);
    const questionsWithAnswers = allQuestions.map((question, index) => {
        return {
            ...question,
            answer: answers[index]
        }
    });
    return new WritingStyleDocument(questionsWithAnswers, englishType, name, id);
}
