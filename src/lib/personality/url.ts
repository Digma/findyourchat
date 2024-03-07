import type { Question } from './types';
import { allQuestions } from "../../lib/personality/questions.ts";
import { WritingStyleDocument } from './dataConverter';


export const encodeAnswerToResultUrl = (writingStyle: WritingStyleDocument) => {
    // Initialize the query parameters string
    let queryParams = [];
    
    // Add a list of all the answers to the query string
    const answerShort = writingStyle.answers.map((answer) => answer.answer).join("");
    queryParams.push(`answers=${encodeURIComponent(answerShort)}`);

    // Add the string variable to the query string
    if (writingStyle.englishType) {
        queryParams.push(`et=${encodeURIComponent(writingStyle.englishType)}`);
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

    const answersShort = urlParams.get('answers');
    if (answersShort) {
        for (let i = 0; i < answersShort.length; i++) {
            answers.push(parseInt(answersShort[i]));
        }
    }

    const englishType = urlParams.get('et') || '';
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
