import type { Question } from "./types";
import { QuizType, QuestionCategory } from "./types";
import * as attribute from "./attributes";

/**
 * Questions for the personality quiz including personality traits and voice & tone
 * 2-sided axis questions with 5-point scale
 */

export const understatedHyperbolic: Question = {
  title: "Understated or Hyperbolic?",
  iconPath: "/card_icons/purple_blue_2.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.understated,
  attribute2: attribute.hyperbolic,
  quizType: QuizType.Scale5,
};

export const reservedEmotionallyExpressive: Question = {
  title: "Reserved or Expressive?",
  iconPath: "/card_icons/purple_blue_5.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.reserved,
  attribute2: attribute.emotionallyExpressive,
  quizType: QuizType.Scale5,
};

export const introvertedExtraverted: Question = {
  title: "Introverted or Extraverted?",
  iconPath: "/card_icons/purple_blue_4.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.introverted,
  attribute2: attribute.extraverted,
  quizType: QuizType.Scale5,
};

export const politenessDirectness: Question = {
  title: "Politeness or Directness?",
  iconPath: "/card_icons/purple_yellow_3.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.politeness,
  attribute2: attribute.directness,
  quizType: QuizType.Scale5,
};

export const intuitiveAnalytical: Question = {
  title: "Intuitive or Analytical?",
  iconPath: "/card_icons/purple_yellow_9.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.intuitive,
  attribute2: attribute.analytical,
  quizType: QuizType.Scale5,
};

export const traditionalProgressive: Question = {
  title: "Traditional or Progressive?",
  iconPath: "/card_icons/purple_yellow_6.svg",
  category: QuestionCategory.PersonalityTraits,
  attribute1: attribute.traditional,
  attribute2: attribute.progressive,
  quizType: QuizType.Scale5,
};

export const formalCasual: Question = {
  title: "Formal or Casual?",
  iconPath: "/card_icons/purple_yellow_1.svg",
  category: QuestionCategory.VoiceAndTone,
  attribute1: attribute.formal,
  attribute2: attribute.casual,
  quizType: QuizType.Scale5,
};

export const seriousPlayful: Question = {
  title: "Serious or Playful?",
  iconPath: "/card_icons/pink_yellow_7.svg",
  category: QuestionCategory.VoiceAndTone,
  attribute1: attribute.serious,
  attribute2: attribute.playful,
  quizType: QuizType.Scale5,
};

export const encouragingCritical: Question = {
  title: "Encouraging or Critical?",
  iconPath: "/card_icons/pink_yellow_6.svg",
  category: QuestionCategory.VoiceAndTone,
  attribute1: attribute.encouraging,
  attribute2: attribute.critical,
  quizType: QuizType.Scale5,
};

export const matterOfFactEnthusiastic: Question = {
  title: "Matter-of-Fact or Enthusiastic?",
  iconPath: "/card_icons/pink_yellow_4.svg",
  category: QuestionCategory.VoiceAndTone,
  attribute1: attribute.matterOfFact,
  attribute2: attribute.enthusiastic,
  quizType: QuizType.Scale5,
};

export const allQuestions: Question[] = [
  understatedHyperbolic,
  reservedEmotionallyExpressive,
  introvertedExtraverted,
  politenessDirectness,
  intuitiveAnalytical,
  traditionalProgressive,
  formalCasual,
  seriousPlayful,
  encouragingCritical,
  matterOfFactEnthusiastic,
];
