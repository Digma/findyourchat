<script lang="ts">
    // TODO: Validation before deleting
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import InlineInput from "../containers/InlineInput.svelte";
    
    import { getWritingStylesFromDB } from "../../lib/personality/api.ts";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import type { WritingStyle } from "../../lib/personality/types.ts";
    import { saveQuestionsToDB } from "../../lib/personality/api.ts";
    import { quizQuestions, saveProfile, editProfile, englishType } from "../../lib/store.ts";

    const questions = [...$quizQuestions];
    // Reset the editing profile
    editProfile.set("false");

    // Use to signal a deleted entry to the table and force a refresh
    let deleteIdx = 0;

    const saveToWritingProfileToDB = async () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        if ($saveProfile == "true") {
            // TODO
            await saveQuestionsToDB(questions, $englishType);
            //await saveQuestionsToDB(questions, $englishType);
            saveProfile.set("false");
        }
    };

    const loadProfileToEdit = (writingStyle: WritingStyle) => async () => {
        quizQuestions.set(writingStyle.questions);
        editProfile.set("true")
    }

    const updateProfileName = (idx: string) => async (e: CustomEvent<string>) => {
        await fetch("/api/users/writing_styles", {
            method: "PUT",
            body: JSON.stringify({
                id: idx,
                name: e.detail,
            }),
        });
    }

    const deleteProfile = (idx: string) => async () => {
        await fetch("/api/users/writing_styles", {
            method: "DELETE",
            body: JSON.stringify({
                id: idx,
            }),
        });
        // Force a refresh of the table
        deleteIdx++;
    }
    
    const createWritingStyleRows = async () => {
        // TODO:
        const styles = await getWritingStylesFromDB();
        //const styles = []
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
                                        <td class="text-right h-full w-64">
                                            <ClipboardButton
                                                textToCopy={style.prompt}
                                            />
                                        </td>
                                        <td class="text-center align-middle h-11 bg-gray-500 rounded m-auto">
                                            <a class="flex flex-row items-center gap-2 text-white p-0" href="/quiz" on:click={loadProfileToEdit(style)}>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5" fill="currentColor">
                                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                                                </span>
                                                <span>Edit</span>
                                            </a>
                                        </td>
                                        <td class="text-right bg-red-500 rounded m-auto h-11 px-4">
                                            <button class="text-white" on:click={deleteProfile(style.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-5 w-5" fill="currentColor"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                            </button>
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
