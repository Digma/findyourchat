import type { APIRoute } from "astro";
import { firestore, auth } from "../../../lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

const writingStyleRef = firestore.collection("writing_styles");

const WRITING_STYLE_COLLECTION = "test";

const NO_TOKEN_RESPONSE = new Response("No token found", { status: 401 });
const MISSING_REQUIRED_FIELDS_RESPONSE = new Response("Missing required fields", { status: 400 });
const USER_NOT_FOUND_RESPONSE = new Response("User not found", { status: 404 });
const SUCCESS = new Response("Success", { status: 200 });

const errorResponse = (error: any) => {
    console.log("Error:", error);
    return new Response("Something went wrong", {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

/* Get all writing styles for a user */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    /* Verify cookie */
    const sessionCookie = cookies.get("session")?.value;
    if (!sessionCookie) {
        return NO_TOKEN_RESPONSE;
    }

    const { uid } = await auth.verifySessionCookie(sessionCookie, true);

    try {
        // Get the specific user document based on the userId
        const styles = await writingStyleRef.doc(uid).collection("test").get();
        if (styles.empty) {
            return USER_NOT_FOUND_RESPONSE;
        }

        const styleDocuments = styles.docs.map((doc) => doc.data());
        // Sending back the user data as JSON
        return new Response(JSON.stringify(styleDocuments), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        // Handle any errors that occurred during the process
        return errorResponse(error);
    }
};

/* Save a new writing style */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    /* Verify required fields */
    const { questions, name, englishType } = await request.json();
    if (!name || !questions || !englishType) {
        return MISSING_REQUIRED_FIELDS_RESPONSE;
    }

    /* Verify cookie */
    const sessionCookie = cookies.get("session")?.value;
    if (!sessionCookie) {
        return NO_TOKEN_RESPONSE;
    }

    const { uid } = await auth.verifySessionCookie(sessionCookie, true);

    try {
        const newEntry = writingStyleRef.doc(uid).collection(WRITING_STYLE_COLLECTION).doc();
        const entryId = newEntry.id;
        await newEntry.create({
            id: entryId,
            user_id: uid,
            name: name,
            answers: JSON.stringify(questions),
            english_type: englishType,
            created_at: FieldValue.serverTimestamp(),
            modified_at: FieldValue.serverTimestamp(),
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
    // const { id, name, answers, englishType } = await request.json();
    // if (!id || !name || !answers || !englishType) {
    //     return MISSING_REQUIRED_FIELDS_RESPONSE;
    // }
    const { id, name } = await request.json();
    console.log("id", id);

    try {
        const entry = writingStyleRef.doc(uid).collection(WRITING_STYLE_COLLECTION).doc(id);
        await entry.update({
            name: name,
            // answers: JSON.stringify(answers),
            // english_type: englishType,
            // modified_at: FieldValue.serverTimestamp(),
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
        const entry = writingStyleRef.doc(uid).collection(WRITING_STYLE_COLLECTION).doc(id);
        await entry.delete();
    } catch (error) {
        errorResponse(error);
    }

    return redirect("/profile");
}

