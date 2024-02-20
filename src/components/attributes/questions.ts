import type { Question } from '../../lib/quiz'
import { QuizType, QuestionCategory } from '../../lib/quiz'
import * as attribute from './attributes'

// Category	Attribute	Value	Description
// Personality Traits	Understated - Hyperbolic	Very Understated	Subtly influential, quietly confident
// Personality Traits	Understated - Hyperbolic	Somewhat Understated	Tactfully restrained, modestly engaging
// Personality Traits	Understated - Hyperbolic	Balanced between Understated and Hyperbolic	Thoughtfully expressive, well-measured impact
// Personality Traits	Understated - Hyperbolic	Somewhat Hyperbolic	Enthusiastically vivid, compellingly persuasive
// Personality Traits	Understated - Hyperbolic	Very Hyperbolic	Dramatically impactful, boldly inspiring
// Personality Traits	Reserved - Emotionally Expressive	Very Reserved	Deeply contemplative, serenely composed
// Personality Traits	Reserved - Emotionally Expressive	Somewhat Reserved	Reflectively calm, warmly discreet
// Personality Traits	Reserved - Emotionally Expressive	Balanced between Reserved and Emotionally Expressive	Evenly responsive, emotionally articulate
// Personality Traits	Reserved - Emotionally Expressive	Somewhat Emotionally Expressive	Vibrantly expressive, passionately communicative
// Personality Traits	Reserved - Emotionally Expressive	Very Emotionally Expressive	Exuberantly open, radiantly empathetic
// Personality Traits	Introverted - Extraverted	Very Introverted	Introspectively insightful, independently creative
// Personality Traits	Introverted - Extraverted	Somewhat Introverted	Quietly sociable, selectively interactive
// Personality Traits	Introverted - Extraverted	Balanced between Introverted and Extraverted	Harmoniously adaptable, socially intuitive
// Personality Traits	Introverted - Extraverted	Somewhat Extraverted	Outwardly engaging, energetically sociable
// Personality Traits	Introverted - Extraverted	Very Extraverted	Unabashedly outgoing, dynamically energetic
// Personality Traits	Politeness - Directness	Very Polite	Graciously courteous, elegantly considerate
// Personality Traits	Politeness - Directness	Somewhat Polite	Respectfully congenial, kindly straightforward
// Personality Traits	Politeness - Directness	Balanced between Poiteness and Directness	Diplomatically assertive, civility infused candor
// Personality Traits	Politeness - Directness	Somewhat Direct	Boldly candid, constructively frank
// Personality Traits	Politeness - Directness	Very Direct	Incisively clear, confidently unambiguous
// Personality Traits	Intuitive - Analytical	Very Intuitive	Profoundly perceptive, instinctively insightful
// Personality Traits	Intuitive - Analytical	Somewhat Intuitive	Intuitively aware, analytically reflective
// Personality Traits	Intuitive - Analytical	Balanced between Intuitive and Analytical	Strategically discerning, logically empathetic
// Personality Traits	Intuitive - Analytical	Somewhat Analytical	Rationally thorough, systematically insightful
// Personality Traits	Intuitive - Analytical	Very Analytical	Precisely logical, rigorously methodical
// Personality Traits	Traditional - Progressive	Very Traditional	Heritage-respecting, time-honored wisdom
// Personality Traits	Traditional - Progressive	Somewhat Traditional	Custom-valuing, progressively historical
// Personality Traits	Traditional - Progressive	Balanced between Traditional and Progressive	Traditionally innovative, adaptively forward-thinking
// Personality Traits	Traditional - Progressive	Somewhat Progressive	Modernly pioneering, traditionally informed
// Personality Traits	Traditional - Progressive	Very Progressive	Visionarily futuristic, boldly reformative
// Tone and Voice	Formal - Casual	Very Formal	Distinctly professional, impeccably mannered
// Tone and Voice	Formal - Casual	Somewhat Formal	Respectably formal, comfortably unpretentious
// Tone and Voice	Formal - Casual	Balanced between Formal and Casual	Professionally relaxed, accessible sophistication
// Tone and Voice	Formal - Casual	Somewhat Casual	Casually confident, pleasantly informal
// Tone and Voice	Formal - Casual	Very Casual	Unreservedly open, freely spirited
// Tone and Voice	Serious - Playful	Very Serious	Profoundly earnest, sincerely focused
// Tone and Voice	Serious - Playful	Somewhat Serious	Considerately solemn, playfully serious
// Tone and Voice	Serious - Playful	Balanced between Serious and Playful	Thoughtfully joyous, seriously cheerful
// Tone and Voice	Serious - Playful	Somewhat Playful	Lightly humorous, seriously lighthearted
// Tone and Voice	Serious - Playful	Very Playful	Delightfully whimsical, joyfully irreverent
// Tone and Voice	Encouraging - Critical	Very Encouraging	Inspiringly supportive, warmly reassuring
// Tone and Voice	Encouraging - Critical	Somewhat Encouraging	Motivationally positive, constructively critical
// Tone and Voice	Encouraging - Critical	Balanced between Encouraging and Critical	Positively evaluative, critically optimistic
// Tone and Voice	Encouraging - Critical	Somewhat Critical	Analytically encouraging, insightfully stringent
// Tone and Voice	Encouraging - Critical	Very Critical	Rigorously evaluative, challengingly motivational
// Tone and Voice	Matter-of-Fact - Enthusiastic	Very Matter-of-Fact	Factually grounded, reliably informative
// Tone and Voice	Matter-of-Fact - Enthusiastic	Somewhat Matter-of-Fact	Realistically descriptive, energetically factual
// Tone and Voice	Matter-of-Fact - Enthusiastic	Balanced between Matter-of-Fact and Enthusiastic	Pragmatically enthusiastic, informatively animated
// Tone and Voice	Matter-of-Fact - Enthusiastic	Somewhat Enthusiastic	Vividly descriptive, factually spirited
// Tone and Voice	Matter-of-Fact - Enthusiastic	Very Enthusiastic	Infectiously eager, exuberantly informative

export const understatedHyperbolic: Question = {
    title: 'Understated or Hyperbolic?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.understated, attribute.hyperbolic],
    quiz_type: QuizType.Scale5,
}

export const reservedEmotionallyExpressive: Question = {
    title: 'Reserved or Emotionally Expressive?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.reserved, attribute.emotionallyExpressive],
    quiz_type: QuizType.Scale5,
}

export const introvertedExtraverted: Question = {
    title: 'Introverted or Extraverted?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.introverted, attribute.extraverted],
    quiz_type: QuizType.Scale5,
}

export const politenessDirectness: Question = {
    title: 'Politeness or Directness?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.politeness, attribute.directness],
    quiz_type: QuizType.Scale5,
}

export const intuitiveAnalytical: Question = {
    title: 'Intuitive or Analytical?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.intuitive, attribute.analytical],
    quiz_type: QuizType.Scale5,
}

export const traditionalProgressive: Question = {
    title: 'Traditional or Progressive?',
    category: QuestionCategory.PersonalityTraits,
    attributes: [attribute.traditional, attribute.progressive],
    quiz_type: QuizType.Scale5,
}

export const formalCasual: Question = {
    title: 'Formal or Casual?',
    category: QuestionCategory.VoiceAndTone,
    attributes: [attribute.formal, attribute.casual],
    quiz_type: QuizType.Scale5,
}

export const seriousPlayful: Question = {
    title: 'Serious or Playful?',
    category: QuestionCategory.VoiceAndTone,
    attributes: [attribute.serious, attribute.playful],
    quiz_type: QuizType.Scale5,
}

export const encouragingCritical: Question = {
    title: 'Encouraging or Critical?',
    category: QuestionCategory.VoiceAndTone,
    attributes: [attribute.encouraging, attribute.critical],
    quiz_type: QuizType.Scale5,
}

export const matterOfFactEnthusiastic: Question = {
    title: 'Matter-of-Fact or Enthusiastic?',
    category: QuestionCategory.VoiceAndTone,
    attributes: [attribute.matterOfFact, attribute.enthusiastic],
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

export const questionAndScoreToDescription = (question: Question, score: number) => {
    const attribute1Name = question.attributes[0].title
    const attribute2Name = question.attributes[1].title

    switch(score) {
        case 1: return `Very ${attribute1Name}`
        case 2: return `Somewhat ${attribute1Name}`
        case 3: return `in-between ${attribute1Name} and ${attribute2Name}`
        case 4: return `Somewhat ${attribute2Name}`
        case 5: return `Very ${attribute2Name}`
    }

    throw new Error('Invalid question score. Please check scoring.') 
}
