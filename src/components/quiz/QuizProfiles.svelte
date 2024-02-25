<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import { quizQuestions } from "../../lib/store.ts";

    import { getQuestionsFromDB } from "../../lib/personality/api.ts";

    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    // TODO: Create a name for each profile
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="mb-4 text-center">
            <h2 class="text-lg font-medium text-gray-900">Your Unique Personality</h2>
        </div>
        {#await getQuestionsFromDB()}
            <p>Loading...</p>
        {:then profiles}
            {#each profiles as profile}
                <div class="flex flex-row w-full items-center gap-2 m-2">
                    <div class="w-[25%] text-right">
                        <p class="font-bold">{profile[0]}</p>
                    </div>
                    <div class="w-[50%] px-4 lg:w-5/12">
                        <div
                            class="bg-gray-200 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl"
                        ></div>
                    </div>
                    <div class="w-[25%] text-left">
                        <p class="font-bold">{profile[1]}</p>
                    </div>
                    <ClipboardButton buttonText="Copy Prompt" textToCopy={getWritingPromptFromQuestions(profile)} />
                </div>
            {/each}
        {:catch error}
            <p>{error.message} - Please Reload the page</p>
        {/await}

        <div class="flow-root mb-4"></div>
        <!-- <ClipboardButton buttonText="Copy Prompt" textToCopy={generatedPrompt} /> -->
        <!-- <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={saveQuestionsToDB}>Save Prompt</button> -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={getQuestionsFromDB}
            >Get Questions</button
        >
    </div>
</div>
