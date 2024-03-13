import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";
import { WritingStyleDocument } from "../../lib/personality/dataConverter.ts";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: writingStyle.name,
        englishType: writingStyle.englishType,
        questions: [...writingStyle.answers],
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
