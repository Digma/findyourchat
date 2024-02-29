<script lang="ts">
    // TODO: Validation before deleting
    // TODO: add edit button to name of profile
    import { Avatar } from "@skeletonlabs/skeleton";

    import ClipboardButton from "../form/ClipboardButton.svelte";
    import InlineInput from "../containers/InlineInput.svelte";
    
    import { getWritingStylesFromDB } from "../../lib/personality/api.ts";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import type { WritingStyle } from "../../lib/personality/types.ts";
    import { saveQuestionsToDB } from "../../lib/personality/api.ts";
    import { quizQuestions, saveProfile, editProfile } from "../../lib/store.ts";

    const questions = [...$quizQuestions];
    // Reset the editing profile
    editProfile.set("false");
            
    // Create initials for each user
    export let userName: string = "User";
    let initials = userName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 3)
        .join("");

    // Use to signal a deleted entry to the table and force a refresh
    let deleteIdx = 0;

    const saveToWritingProfileToDB = async () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        if ($saveProfile == "true") {
            await saveQuestionsToDB(questions);
            saveProfile.set("false");
        }
    };

    const loadProfileToEdit = (writingStyle: WritingStyle) => async () => {
        quizQuestions.set(writingStyle.questions);
        editProfile.set("true")
    }

    const updateProfileName = (idx: string) => async (e: CustomEvent<string>) => {
        await fetch("/api/personalities", {
            method: "PUT",
            body: JSON.stringify({
                id: idx,
                name: e.detail,
            }),
        });
    }

    const deleteProfile = (idx: string) => async () => {
        await fetch("/api/personalities", {
            method: "DELETE",
            body: JSON.stringify({
                id: idx,
            }),
        });
        // Force a refresh of the table
        deleteIdx++;
    }
    
    const createWritingStyleRows = async () => {
        const styles = await getWritingStylesFromDB();
        return styles.map((profile) => {
            return {
                id: profile.id,
                name: profile.name,
                prompt: getWritingPromptFromQuestions(profile.questions),
                questions: profile.questions,
            } as WritingStyle;
        });
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 rounded-lg sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="w-full flex gap-2 items-center">
            <Avatar class="self-center" {initials} background="bg-gray-300" />
            <h2 class="text-3xl font-bold center text-gray-900">{userName}</h2>
            <form action="/api/auth/signout" class="flex-1 text-right">
                <button type="submit" class="italic">Sign out</button>
            </form>
        </div>
        <div class="w-full mb-2 mt-8">
            <h2 class="text-lg font-bold text-white">Your Personalities</h2>
        </div>
        <!-- svelte-ignore empty-block -->
        {#await saveToWritingProfileToDB()}
        {:then}
            {#key deleteIdx}
            {#await createWritingStyleRows()}
                <p>Loading...</p>
            {:then styles}
                {#if styles.length === 0}
                    <p class="w-full mt-4 italic">No profiles found</p>
                {:else}
                    <div class="table-container">
                        <!-- Native Table Element -->
                        <table class="table table-hover table-compact">
                            <thead>
                                <!-- <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Symbol</th>
                                </tr> -->
                            </thead>
                            <tbody>
                                {#each styles as style, index}
                                    <tr class="flex h-full p-2 gap-2">
                                        <td class="m-auto w-full">
                                            <InlineInput value={style.name} on:blur={updateProfileName(style.id)}/>
                                        </td>
                                        <td class="text-right h-full p-0">
                                            <ClipboardButton
                                                buttonText="Copy Prompt"
                                                textToCopy={style.prompt}
                                            />
                                        </td>
                                        <td class="text-right h-full bg-rose-accent rounded m-auto">
                                            <a class="text-red-500" href="/quiz" on:click={loadProfileToEdit(style)}>✍️</a>
                                        </td>
                                        <td class="text-right h-full bg-blue-accent rounded m-auto">
                                            <button class="text-red-500" on:click={deleteProfile(style.id)}>❌</button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                            <tfoot>
                                <!-- <tr>
                                <th colspan="3">Calculated Total Weight</th>
                                <td>{totalWeight}</td>
                            </tr> -->
                            </tfoot>
                        </table>
                    </div>
                {/if}
            {:catch error}
                <p>{error.message} - Please Reload the page</p>
            {/await}
            {/key}
        {:catch error}
            <p>Could not save the profile. Please reload the page</p>
        {/await}
        <div class="w-full flex flex-col mt-8">
            <a
                class="w-64 ml-auto text-center bg-blue-500 text-white px-4 py-2 rounded-lg"
                href="/quiz">Create new Writing Style</a
            >
        </div>
    </div>
</div>
