import { persistentAtom } from "@nanostores/persistent";
import { WritingStyleDocument } from "./personality/dataConverter.ts";
import type { UserRecord } from "firebase-admin/auth";

export const currentWritingStyle = persistentAtom<
  WritingStyleDocument | undefined
>("currentWritingStyle", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const saveProfile = persistentAtom<string>("saveProfile", "false");
export const editProfile = persistentAtom<string>("editProfile", "false");

export const userRecord = persistentAtom<UserRecord | undefined>("user", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
