<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import { getWritingStylesFromDB } from "../../lib/personality/api.ts";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { saveQuestionsToDB } from "../../lib/personality/api.ts";

    import { quizQuestions, saveProfile } from "../../lib/store.ts";
    const questions = [...$quizQuestions];
    
    const saveToProfile = async () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        if ($saveProfile == "true") {
            await saveQuestionsToDB(questions);
            saveProfile.set("false");
        }
    };

    import InlineInput from "../containers/InlineInput.svelte";
    // TODO: Create a name for each profile
    export let userName: string = "User";
    let initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("");

    const updateProfileName = (idx: string) => async (e: CustomEvent<string>) => {
        const response = await fetch("/api/personalities", {
            method: "PUT",
            body: JSON.stringify({
                id: idx,
                name: e.detail,
            }),
        });
    }
    
    const createWritingStyleRows = async () => {
        console.log("Fetching Writing Styles");
        const styles = await getWritingStylesFromDB();
        console.log("Fetched Writing Styles", styles);
        return styles.map((profile) => {
            return {
                id: profile.id,
                name: profile.name,
                prompt: getWritingPromptFromQuestions(profile.questions),
            };
        });
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="w-full flex gap-2">
            <Avatar class="h-8 self-center" {initials} background="bg-gray-300" />
            <h2 class="text-lg font-bold center text-gray-900">{userName}</h2>
            <form action="/api/auth/signout" class="flex-1 text-right">
                <button type="submit" class="italic">Sign out</button>
            </form>
        </div>
        <div class="w-full mb-2 mt-8">
            <h2 class="text-lg font-bold text-gray-900">Your Personalities</h2>
        </div>
        <!-- svelte-ignore empty-block -->
        {#await saveToProfile()}
        {:then}
            {#await createWritingStyleRows()}
                <p>Loading...</p>
            {:then styles}
                {#if styles.length === 0}
                    <p class="w-full mt-4 italic">No profiles found</p>
                {:else}
                    <div class="table-container">
                        <!-- Native Table Element -->
                        <table class="table table-hover">
                            <thead>
                                <!-- <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Symbol</th>
                                </tr> -->
                            </thead>
                            <tbody>
                                {#each styles as style, index}
                                    <tr class="h-full">
                                        <td>{style.id}</td>
                                        <td class=""> <InlineInput value={style.name} on:blur={updateProfileName(style.id)}/></td>
                                        <td class="text-right">
                                            <ClipboardButton
                                                buttonText="Copy Prompt"
                                                textToCopy={style.prompt}
                                            />
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
