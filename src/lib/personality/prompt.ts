import { QuestionCategory, type Question } from "./types";


const writingStyleToPrompt = (origin: string, personalityTraits: string[], voiceAndTone: string[]) => {
    return (`
Act as an professional Ghostwriter writing text that match a precise client writing style. 
Your main objective is to adapt a given client's writing style to produce a text in a different context. 
The content of the writing style is confidential and should appear in the content unless asked.

Client Writing Style:

- Origin: ${origin}
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


export const checkIfAllQuestionsAnswered = (questions: Question[]) => {
    return questions.every((question) => { return question.answer });
}

export const getWritingPromptFromQuestions = (questions: Question[]) => {
    if (!checkIfAllQuestionsAnswered(questions)) {
        throw Error("Prompt generation requires a defined value for all questions");
    }

    let personalityArray: string[] = [];
    let toneAndVoiceArray: string[] = [];

    for (const question of questions) {
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


        // if (questionCategory.valueOf() === QuestionCategory.PersonalityTraits.valueOf()) {
        //     personalityArray.push(scoreDescription);
        // } else if (questionCategory.valueOf() === QuestionCategory.VoiceAndTone.valueOf()) {
        //     toneAndVoiceArray.push(scoreDescription);
        // } else if (questionCategory.valueOf() === QuestionCategory.WritingStyle.valueOf()) {
        //     writingStyleArray.push(scoreDescription);
        // }
    }

    // TOOD: Add writing Style array
    const prompt = writingStyleToPrompt(
        "Swiss, non-native english",
        personalityArray,
        toneAndVoiceArray
    );
    console.log(prompt);
    return prompt;
};