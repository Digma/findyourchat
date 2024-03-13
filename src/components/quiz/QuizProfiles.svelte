<script lang="ts">
    // TODO: Validation before deleting
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import InlineInput from "../containers/InlineInput.svelte";
    
    import { getWritingStylesFromDB, updateWritingStyleName, updateWritingStyleAnswers, deleteWritingStyle } from "../../lib/personality/api.ts";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { postWritingStyleToDB } from "../../lib/personality/api.ts";
    import { WritingStyleDocument } from "@/lib/personality/dataConverter.ts";
    import { currentWritingStyle, saveProfile, editProfile } from "../../lib/store.ts";
    import { humanRelativeTime } from "../../lib/date.ts";
    import { encodeAnswerToResultUrl } from "../../lib/personality/url.ts";

    // Use to signal a deleted entry to the table and force a refresh
    let deleteIdx = 0;

    const saveToWritingProfileToDB = async () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        if ($saveProfile === "true" && $currentWritingStyle) {
            if ($editProfile === "true") {
                // Update the profile
                await updateWritingStyleAnswers($currentWritingStyle);
            } else {
                await postWritingStyleToDB($currentWritingStyle);
            }
        }
        
        // Reset the editing profile
        currentWritingStyle.set(undefined);
        saveProfile.set("false");
        editProfile.set("false");
    };

    const loadProfileToEdit = (writingStyle: WritingStyleDocument) => async () => {
        currentWritingStyle.set(writingStyle);
        editProfile.set("true")
    }

    const updateProfileName = (idx: string|undefined) => async (e: CustomEvent<string>) => {
        if (idx) updateWritingStyleName(idx, e.detail);
        else console.error("No Id linked to profile to update");
    }

    const deleteProfile = (idx: string|undefined) => async () => {
        if (idx){
            await deleteWritingStyle(idx);
            // Force a refresh of the table
            deleteIdx++;
        } else {
            console.error("No Id linked to profile to delete");
        }
    }
    
    // Create the rows for the table
    const createWritingStyleRows = async () => {
        const styles = await getWritingStylesFromDB();
        return styles.map((profile) => {
            return {
                id: profile.id,
                name: profile.name,
                prompt: getWritingPromptFromQuestions(profile),
                questions: profile.answers,
                modified_at: humanRelativeTime(profile.modified_at),
                writingStyle: profile
            };
        });
    };

    const writingStyleToResultUrl = (writingStyle: WritingStyleDocument) => {
        return encodeAnswerToResultUrl(writingStyle);
    }

    let open = false;
    const closePopup = () => {
        open = false;
    };
    const openPopup = () => {
        open = true;
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-1 sm:p-1 md:p-4 lg:p-8 max-w-[1000px] rounded-lg flex flex-col justify-center items-center"
    >
        <div class="flex w-full mb-8 mt-8">
            <h2 class="text-3xl font-bold text-white m-auto">Your Personalities</h2>
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
                    <div class="w-full flex flex-col">
                        <div class="overflow-x-auto">
                            <div class="inline-block min-w-full md:px-2 lg:px-4">
                                <div class="overflow-hidden items-center sm:justify-center">
                                    <table
                                        class="w-full text-left text-sm sm:text-md font-light text-surface dark:text-white">
                                        <tbody>
                                            {#each styles as style, index}
                                            <tr class="text-center sm:text-left items-center sm:items-left flex flex-col mb-4 sm:table-row border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200/15">
                                                <td class="whitespace-nowrap font-bold py-4 min-w-64 text-md">
                                                    <InlineInput value={style.name} on:blur={updateProfileName(style.id)}/>
                                                </td>
                                                <td class="whitespace-nowrap py-2 italic">
                                                    <p>{style.modified_at}</p>
                                                </td>
                                                <td class="whitespace-nowrap sm:pl-2 py-2 md:m-auto">
                                                    <ClipboardButton
                                                    textToCopy={style.prompt}
                                                    />
                                                </td>
                                                <div>
                                                    {#if open}
                                                    <!-- Content will be hidden until the user clicks on the summary button. -->
                                                    <div class="absolute top-0 left-0 w-full h-full bg-gray-700/30"></div>
                                                    <div class="top-[30%] bg-white rounded-2xl w-[50%] h-fit mx-auto absolute inset-0 text-gray-600 p-4 py-8">
                                                        <!-- Delete Confirmation Popup -->
                                                        <div class="flex flex-col items-center justify-center">
                                                            <h2 class="text-2xl font-bold mb-4">Are you sure you want to delete this profile?</h2>
                                                            <div class="flex flex-row gap-4">
                                                                <button class="text-white rounded justify-center bg-red-500 p-1 px-3" on:click={deleteProfile(style.id)}>
                                                                    <p>Delete</p>
                                                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-10 w-10" fill="currentColor"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg> -->
                                                                </button>
                                                                <button class="text-white rounded justify-center bg-gray-500 p-1 px-3" on:click={closePopup}>
                                                                    <p>Cancel</p>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/if}
                                                </div>
                                                <td class="whitespace-nowrap px-2 py-2 md:m-auto">
                                                    <a class="flex flex-row items-center justify-center bg-gray-500 p-1 rounded gap-2 text-white " href={writingStyleToResultUrl(style.writingStyle)} on:click={loadProfileToEdit(style.writingStyle)}>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4" fill="currentColor">
                                                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                                                            </span>
                                                            <span>See</span>
                                                        </a>
                                                    </td>
                                                <td class="whitespace-nowrap px-2 py-2 md:m-auto mb-2">
                                                    <button class="text-white rounded justify-center bg-red-500 p-1 px-3" on:click={openPopup}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-5 w-5" fill="currentColor"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
                class="w-88 text-lg font-bold m-auto text-center bg-orange-accent text-white px-6 py-2 rounded-lg"
                href="/quiz"
                >Create new Style</a
            >
        </div>
    </div>
</div>
