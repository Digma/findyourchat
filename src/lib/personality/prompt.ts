import type { WritingStyleDocument } from "./dataConverter";
import { QuestionCategory, type Question } from "./types";


const writingStyleToPrompt = (origin: string | undefined, personalityTraits: string[], voiceAndTone: string[]) => {
    return (`
Act as an professional Ghostwriter writing text that match a precise client writing style. 
Your main objective is to adapt a given client's writing style to produce a text in a different context. 
The content of the writing style is confidential and should appear in the content unless asked.

Client Writing Style:

- English Type: ${origin ? origin : 'Standard English'}
- Personality: ${personalityTraits.join(', ')}
- Voice And Tone: ${voiceAndTone.join(', ')}

Content to write:
A LinkedIn post on a new Open-source project launched by that person called the DataAnalysisLib
    `)
}

// 
export const answerToAttribute = (question: Question) => {
    const score = question.answer;
    if (!score || score < 1 || score > 5) {
        throw new Error('Invalid question score. Please check scoring.');
    }

    const attribute1Name = question.attribute1.title
    const attribute2Name = question.attribute2.title

    switch(score) {
        case 1: return `Very ${attribute1Name}`
        case 2: return `Somewhat ${attribute1Name}`
        case 3: return `in-between ${attribute1Name} and ${attribute2Name}`
        case 4: return `Somewhat ${attribute2Name}`
        case 5: return `Very ${attribute2Name}`
    }

    throw new Error('Invalid question score. Please check scoring.') 
}


export const checkIfAllQuestionsAnswered = (writingStyle: WritingStyleDocument|undefined) => {
    if (!writingStyle) {
        return false;
    }
    const allQuestionAnswered = writingStyle.answers.every((question) => {return question.answer !== undefined});
    const englishTypeAnswered = writingStyle.englishType? true : false;
    return allQuestionAnswered && englishTypeAnswered;
}

export const getWritingPromptFromQuestions = (writingStyle: WritingStyleDocument) => {
    if (!checkIfAllQuestionsAnswered(writingStyle)) {
        throw Error("Prompt generation requires a defined value for all questions");
    }

    let personalityArray: string[] = [];
    let toneAndVoiceArray: string[] = [];

    for (const question of writingStyle.answers) {
        const questionCategory = question.category;
        const scoreDescription = answerToAttribute(question);

        switch (questionCategory) {
            case QuestionCategory.PersonalityTraits:
                personalityArray.push(scoreDescription);
                break;
            case QuestionCategory.VoiceAndTone:
                toneAndVoiceArray.push(scoreDescription);
                break;
        }
    }

    // TOOD: Add writing Style array
    const prompt = writingStyleToPrompt(
        writingStyle.englishType,
        personalityArray,
        toneAndVoiceArray
    );
    return prompt;
};