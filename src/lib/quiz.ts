export const enum QuizType {
    Scale5 = "Scale5",
}

export const enum QuestionCategory {
    PersonalityTraits = "Personality Traits",
    VoiceAndTone = "Voice & Tone",
    WritingStyle = "Writing Style",
}

export type Question = {
    title: string;
    category: QuestionCategory;
    attributes: Attribute[];
    quiz_type: QuizType;
}

export type Attribute = {
    title: string;
    description: string;
    image_url?: string;
    example: string;
}
