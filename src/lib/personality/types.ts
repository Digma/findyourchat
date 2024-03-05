export const enum QuizType {
    Scale5 = "Scale5",
}

export enum EnglishType {
    International = "International",
    American = "American",
    British = "British",
    SouthAfrican = "South African",
    Australian = "Australian",
    Canadian = "Canadian",
    Indian = "Indian",
    Irish = "Irish",
    NewZealand = "New Zealand",
    Singaporean = "Singaporean",
} 

export const enum QuestionCategory {
    PersonalityTraits = "Personality Traits",
    VoiceAndTone = "Voice & Tone",
    WritingStyle = "Writing Style",
}

export type Question = {
    title: string;
    category: QuestionCategory;
    attribute1: Attribute;
    attribute2: Attribute;
    quiz_type: QuizType;
    answer?: number;
}

export type Attribute = {
    title: string;
    description: string;
    image_url?: string;
    example: string;
}

export type WritingStyle = {
    id: string;
    name: string;
    englishType: string;
    questions: Question[];
};
