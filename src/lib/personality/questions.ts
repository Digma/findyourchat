import type { Question } from './types'
import { QuizType, QuestionCategory } from './types'
import * as attribute from './attributes'

/**
 * Questions for the personality quiz including personality traits and voice & tone
 * 2-sided axis questions with 5-point scale
 */

export const understatedHyperbolic: Question = {
    title: 'Understated or Hyperbolic?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.understated,
    attribute2: attribute.hyperbolic,
    quiz_type: QuizType.Scale5,
}

export const reservedEmotionallyExpressive: Question = {
    title: 'Reserved or Expressive?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.reserved,
    attribute2: attribute.emotionallyExpressive,
    quiz_type: QuizType.Scale5,
}

export const introvertedExtraverted: Question = {
    title: 'Introverted or Extraverted?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.introverted,
    attribute2: attribute.extraverted,
    quiz_type: QuizType.Scale5,
}

export const politenessDirectness: Question = {
    title: 'Politeness or Directness?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.politeness,
    attribute2: attribute.directness,
    quiz_type: QuizType.Scale5,
}

export const intuitiveAnalytical: Question = {
    title: 'Intuitive or Analytical?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.intuitive,
    attribute2: attribute.analytical,
    quiz_type: QuizType.Scale5,
}

export const traditionalProgressive: Question = {
    title: 'Traditional or Progressive?',
    category: QuestionCategory.PersonalityTraits,
    attribute1: attribute.traditional,
    attribute2: attribute.progressive,
    quiz_type: QuizType.Scale5,
}

export const formalCasual: Question = {
    title: 'Formal or Casual?',
    category: QuestionCategory.VoiceAndTone,
    attribute1: attribute.formal,
    attribute2: attribute.casual,
    quiz_type: QuizType.Scale5,
}

export const seriousPlayful: Question = {
    title: 'Serious or Playful?',
    category: QuestionCategory.VoiceAndTone,
    attribute1: attribute.serious,
    attribute2: attribute.playful,
    quiz_type: QuizType.Scale5,
}

export const encouragingCritical: Question = {
    title: 'Encouraging or Critical?',
    category: QuestionCategory.VoiceAndTone,
    attribute1: attribute.encouraging,
    attribute2: attribute.critical,
    quiz_type: QuizType.Scale5,
}

export const matterOfFactEnthusiastic: Question = {
    title: 'Matter-of-Fact or Enthusiastic?',
    category: QuestionCategory.VoiceAndTone,
    attribute1: attribute.matterOfFact,
    attribute2: attribute.enthusiastic,
    quiz_type: QuizType.Scale5,
}


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
]

