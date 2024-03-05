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
  iconPath?: string;
  category: QuestionCategory;
  attribute1: Attribute;
  attribute2: Attribute;
  quizType: QuizType;
  answer?: number;
};

export type Attribute = {
  title: string;
  description: string;
  imageUrl?: string;
  example: string;
};
