import type { Question } from "./types.js";

export const createDefaultNameFromQuestion = (questions: Question[]) => {
  const veryLowAnswers = questions
    .filter((q) => q.answer === 1)
    .map((q) => q.attribute1.title);
  const veryHighAnswers = questions
    .filter((q) => q.answer === 5)
    .map((q) => q.attribute2.title);
  const veryLowAndHighAnswers = veryLowAnswers.concat(veryHighAnswers);
  if (veryLowAndHighAnswers.length > 0) {
    return veryLowAndHighAnswers.slice(0, 3).join(" ");
  }

  const mediumLowAnswers = questions
    .filter((q) => q.answer === 2)
    .map((q) => q.attribute1.title);
  const mediumHighAnswers = questions
    .filter((q) => q.answer === 4)
    .map((q) => q.attribute2.title);
  const mediumLowAndHighAnswers = mediumLowAnswers.concat(mediumHighAnswers);
  if (mediumLowAndHighAnswers.length > 0) {
    return mediumLowAndHighAnswers.slice(0, 3).join(" ");
  }

  return "Perfectly Balanced as all things should be.";
};
