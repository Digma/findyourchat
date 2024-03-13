import type { APIRoute } from "astro";
import { FieldValue } from "firebase-admin/firestore";

import { firestore, auth } from "../../../lib/firebase/server";
import { writingStyleConverter } from "../../../lib/personality/dataConverter";

const writingStyleRef = firestore.collection("writing_styles");

const WRITING_STYLE_COLLECTION = "styles";

const NO_TOKEN_RESPONSE = new Response("No token found", { status: 401 });
const MISSING_REQUIRED_FIELDS_RESPONSE = new Response(
  "Missing required fields",
  { status: 400 },
);
const USER_NOT_FOUND_RESPONSE = new Response("User not found", { status: 404 });
// const SUCCESS = new Response("Success", { status: 200 });

const errorResponse = (error: unknown) => {
  console.error(error);
  return new Response("Something went wrong", {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/* Get all writing styles for a user */
export const GET: APIRoute = async ({ cookies }) => {
  /* Verify cookie */
  const sessionCookie = cookies.get("session")?.value;
  if (!sessionCookie) {
    return NO_TOKEN_RESPONSE;
  }

  const { uid } = await auth.verifySessionCookie(sessionCookie, true);
  try {
    // Get the specific user document based on the userId
    const styles = await writingStyleRef
      .doc(uid)
      .collection(WRITING_STYLE_COLLECTION)
      // @ts-expect-error: Typescript nightmare to setup all required types
      .withConverter(writingStyleConverter)
      .get();

    if (styles.empty) {
      return USER_NOT_FOUND_RESPONSE;
    }

    const styleDocuments = styles.docs
      .map((doc) => doc.data())
      .sort((doc1, doc2) => {
        return doc2.modified_at.getTime() - doc1.modified_at.getTime();
      })
      .filter((doc) => !doc.deleted);

    // Sending back the user data as JSON
    return new Response(JSON.stringify(styleDocuments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    // Handle any errors that occurred during the process
    return errorResponse(error);
  }
};

/* Save a new writing style */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  
  /* Verify required fields */
  const { questions, name, englishType } = await request.json();
  if (!name || !questions || !englishType) {
    console.info("Missing required fields");
    return MISSING_REQUIRED_FIELDS_RESPONSE;
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  /* Verify cookie */
  const sessionCookie = cookies.get("session")?.value;
  if (!sessionCookie) {
    return NO_TOKEN_RESPONSE;
  }

  const { uid } = await auth.verifySessionCookie(sessionCookie, true);

  try {
    const newEntry = writingStyleRef
      .doc(uid)
      .collection(WRITING_STYLE_COLLECTION)
      .doc();
    const entryId = newEntry.id;
    await newEntry.create({
      id: entryId,
      user_id: uid,
      name: name,
      answers: JSON.stringify(questions),
      english_type: englishType,
      created_at: FieldValue.serverTimestamp(),
      modified_at: FieldValue.serverTimestamp(),
      deleted: false,
    });
  } catch (error) {
    errorResponse(error);
  }

  return redirect("/profile");
};

/* Update a given writing style */
export const PUT: APIRoute = async ({ request, cookies, redirect }) => {
  /* Verify cookie */
  const sessionCookie = cookies.get("session")?.value;
  if (!sessionCookie) {
    return NO_TOKEN_RESPONSE;
  }

  const { uid } = await auth.verifySessionCookie(sessionCookie, true);
  const { id, name, answers, englishType } = await request.json();
  if (!id) {
    return MISSING_REQUIRED_FIELDS_RESPONSE;
  }

  // Create an object with the data to update
  let dataToUpdate = {};
  if (name) {
    dataToUpdate = { ...dataToUpdate, name: name };
  }
  if (answers) {
    dataToUpdate = { ...dataToUpdate, answers: JSON.stringify(answers) };
  }
  if (englishType) {
    dataToUpdate = { ...dataToUpdate, english_type: englishType };
  }

  try {
    const entry = writingStyleRef
      .doc(uid)
      .collection(WRITING_STYLE_COLLECTION)
      .doc(id);
    await entry.update({
      ...dataToUpdate,
      modified_at: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    errorResponse(error);
  }

  return redirect("/profile");
};

/* Delete a given writing style */
export const DELETE: APIRoute = async ({ request, cookies, redirect }) => {
  /* Verify cookie */
  const sessionCookie = cookies.get("session")?.value;
  if (!sessionCookie) {
    return NO_TOKEN_RESPONSE;
  }

  const { uid } = await auth.verifySessionCookie(sessionCookie, true);
  const { id } = await request.json();
  if (!uid) {
    return MISSING_REQUIRED_FIELDS_RESPONSE;
  }

  try {
    const entry = writingStyleRef
      .doc(uid)
      .collection(WRITING_STYLE_COLLECTION)
      .doc(id);
    await entry.update({
      deleted: true,
      modified_at: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    errorResponse(error);
  }

  return redirect("/profile");
};
