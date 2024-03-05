import { persistentAtom } from "@nanostores/persistent";
import { WritingStyleDocument } from "./personality/dataConverter.ts";
// import { computed } from 'nanostores'

// const version = await import.meta.env.PUBLIC_LOCAL_STORAGE_VERSION
//const colorId = persistentAtom<string>(`velarshop_color_active/${ version }`, "")

export const currentWritingStyle = persistentAtom<
  WritingStyleDocument | undefined
>("currentWritingStyle", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const saveProfile = persistentAtom<string>("saveProfile", "false");
export const editProfile = persistentAtom<string>("editProfile", "false");
