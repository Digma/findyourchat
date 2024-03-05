import type { Question } from "./types.ts";
import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";
import { WritingStyleDocument } from "../../lib/personality/dataConverter.ts";

const createDefaultNameFromQuestion = (questions: Question[]) => {
  const veryLowAnswers = questions
    .filter((q) => q.answer === 1)
    .map((q) => q.attribute1.title);
  const veryHighAnswers = questions
    .filter((q) => q.answer === 5)
    .map((q) => q.attribute2.title);
  const veryLowAndHighAnswers = veryLowAnswers.concat(veryHighAnswers);
  if (veryLowAndHighAnswers.length > 0) {
    return veryLowAnswers.slice(0, 3).join(" ");
  }

  const mediumLowAnswers = questions
    .filter((q) => q.answer === 2)
    .map((q) => q.attribute1.title);
  const mediumHighAnswers = questions
    .filter((q) => q.answer === 4)
    .map((q) => q.attribute2.title);
  const mediumLowAndHighAnswers = mediumLowAnswers.concat(mediumHighAnswers);
  if (mediumLowAndHighAnswers.length > 0) {
    return mediumLowAnswers.slice(0, 3).join(" ");
  }

  return "Perfectly Balanced as all things should be.";
};

export const getWritingStylesFromDB: () => Promise<
  WritingStyleDocument[]
> = async () => {
  const response = await fetch("/api/users/writing_styles", {
    method: "GET",
  });
  const responseJson = await response.json();
  const writingStyles = responseJson.map((r: WritingStyleDocument) => {
    const created_at = r.created_at ? new Date(r.created_at) : undefined;
    const modified_at = r.modified_at ? new Date(r.modified_at) : undefined;
    return {
      ...r,
      created_at,
      modified_at,
    } as WritingStyleDocument;
  });

  return writingStyles;
};

export const postWritingStyleToDB = async (
  writingStyle: WritingStyleDocument,
) => {
  const allQuestionAnswered = checkIfAllQuestionsAnswered(writingStyle);

  if (allQuestionAnswered) {
    const response = await fetch("/api/users/writing_styles", {
      method: "POST",
      body: JSON.stringify({
        name: createDefaultNameFromQuestion(writingStyle.answers),
        englishType: writingStyle.englishType,
        questions: writingStyle.answers,
      }),
    });

    return response;
  } else {
    return new Response(
      JSON.stringify({
        error: "Not all questions answered",
      }),
      { status: 400 },
    );
  }
};

export const updateWritingStyleName = async (id: string, name: string) => {
  await fetch("/api/users/writing_styles", {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      name: name,
    }),
  });
};

export const updateWritingStyleAnswers = async (
  writingStyle: WritingStyleDocument,
) => {
  await fetch("/api/users/writing_styles", {
    method: "PUT",
    body: JSON.stringify({
      id: writingStyle.id,
      answers: writingStyle.answers,
    }),
  });
};

export const deleteWritingStyle = async (id: string) => {
  await fetch("/api/users/writing_styles", {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
  });
};
