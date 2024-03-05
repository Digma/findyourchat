import type {
  SnapshotOptions,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import type { Question } from "./types";

export class WritingStyleDocument {
  answers: Question[];
  englishType?: string;
  name?: string;
  id?: string;
  deleted?: boolean;
  created_at?: Date;
  modified_at?: Date;

  constructor(
    questions: Question[],
    englishType?: string,
    name?: string,
    id?: string,
    deleted?: boolean,
    created_at?: Date,
    modified_at?: Date,
  ) {
    this.answers = questions;
    this.englishType = englishType;
    this.name = name;
    this.id = id;
    this.deleted = deleted;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }

  public clone(): WritingStyleDocument {
    return new WritingStyleDocument(
      this.answers,
      this.englishType,
      this.name,
      this.id,
      this.deleted,
      this.created_at,
      this.modified_at,
    );
  }

  toString() {
    return `answer_id=${this.id}`;
  }
}

export const cloneWritingStyle = (writingStyle: WritingStyleDocument) => {
  return new WritingStyleDocument(
    writingStyle.answers,
    writingStyle.englishType,
    writingStyle.name,
    writingStyle.id,
    writingStyle.deleted,
    writingStyle.created_at,
    writingStyle.modified_at,
  );
}


// Firestore data converter
export const writingStyleConverter = {
  toFirestore(writingStyle: WritingStyleDocument): DocumentData {
    return {
      answers: writingStyle.answers,
      englishType: writingStyle.englishType,
      name: writingStyle.name,
      id: writingStyle.id,
      deleted: writingStyle.deleted,
      created_at: writingStyle.created_at,
      modified_at: writingStyle.modified_at,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): WritingStyleDocument {
    const data = snapshot.data(options)!;
    const answersParsed = JSON.parse(data.answers);
    const creationDate = data.created_at
      ? new Date(data.created_at._seconds * 1000)
      : undefined;
    const modifiedDate = data.modified_at
      ? new Date(data.modified_at._seconds * 1000)
      : undefined;

    return new WritingStyleDocument(
      answersParsed,
      data.english_type,
      data.name,
      data.id,
      data.deleted,
      creationDate,
      modifiedDate,
    );
  },
};
