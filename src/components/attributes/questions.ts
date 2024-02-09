import type { Question } from '../../lib/quiz'
import { QuizType } from '../../lib/quiz'
import * as attribute from './attributes'

export const cautiousBoldQuestion: Question = {
    title: 'Cautious or Bold?',
    attributes: [attribute.cautious, attribute.bold],
    quiz_type: QuizType.Scale5,
}

export const reservedExpressiveQuestion: Question = {
    title: 'Reserved or Expressive?',
    attributes: [attribute.reserved, attribute.expressive],
    quiz_type: QuizType.Scale5,
}

export const analyticalIntuitiveQuestion: Question = {
    title: 'Analytical or Intuitive?',
    attributes: [attribute.analytical, attribute.intuitive],
    quiz_type: QuizType.Scale5,
}

export const practicalImaginativeQuestion: Question = {
    title: 'Practical or Imaginative?',
    attributes: [attribute.practical, attribute.imaginative],
    quiz_type: QuizType.Scale5,
}

export const confidentSelfReflectiveQuestion: Question = {
    title: 'Confident or Self-reflective?',
    attributes: [attribute.empathetic, attribute.selfReflective],
    quiz_type: QuizType.Scale5,
}

export const empatheticObjectiveQuestion: Question = {
    title: 'Empathetic or Objective?',
    attributes: [attribute.empathetic, attribute.objective],
    quiz_type: QuizType.Scale5,
}

export const systematicCreativeQuestion: Question = {
    title: 'Systematic or Creative?',
    attributes: [attribute.systematic, attribute.creative],
    quiz_type: QuizType.Scale5,
}

export const sociableIndependentQuestion: Question = {
    title: 'Sociable or Independent?',
    attributes: [attribute.sociable, attribute.independent],
    quiz_type: QuizType.Scale5,
}

export const formalInformalQuestion: Question = {
    title: 'Formal or Informal?',
    attributes: [attribute.formal, attribute.informal],
    quiz_type: QuizType.Scale5,
}

export const authoritativeApproachableQuestion: Question = {
    title: 'Authoritative or Approachable?',
    attributes: [attribute.authoritative, attribute.approachable],
    quiz_type: QuizType.Scale5,
}

export const seriousPlayfulQuestion: Question = {
    title: 'Serious or Playful?',
    attributes: [attribute.serious, attribute.playful],
    quiz_type: QuizType.Scale5,
}

export const enthusiastDetachmentQuestion: Question = {
    title: 'Enthusiast or Detached?',
    attributes: [attribute.enthusiast, attribute.detachment],
    quiz_type: QuizType.Scale5,
}

export const encouragingCriticalQuestion: Question = {
    title: 'Encouraging or Critical?',
    attributes: [attribute.encouraging, attribute.critical],
    quiz_type: QuizType.Scale5,
}

export const personalImpersonalQuestion: Question = {
    title: 'Personal or Impersonal?',
    attributes: [attribute.personal, attribute.impersonal],
    quiz_type: QuizType.Scale5,
}

export const allQuestions: Question[] = [
    cautiousBoldQuestion,
    reservedExpressiveQuestion,
    analyticalIntuitiveQuestion,
    practicalImaginativeQuestion,
    confidentSelfReflectiveQuestion,
    empatheticObjectiveQuestion,
    systematicCreativeQuestion,
    sociableIndependentQuestion,
    formalInformalQuestion,
    authoritativeApproachableQuestion,
    seriousPlayfulQuestion,
    enthusiastDetachmentQuestion,
    encouragingCriticalQuestion,
    personalImpersonalQuestion,
]
