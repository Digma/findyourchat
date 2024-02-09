export const enum QuizType {
    Scale5 = "Scale5",
}

export type Question = {
    title: string;
    attributes: Attribute[];
    quiz_type: QuizType;
}

export type Attribute = {
    title: string;
    description: string;
    image_url?: string;
    example: string;
}
