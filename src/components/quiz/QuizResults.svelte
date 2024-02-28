<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { quizQuestions, saveProfile } from "../../lib/store.ts";

    const questions = [...$quizQuestions];
    const questionAnswerToProgress = (answer: number) => {
        const percentage = (answer - 1) * 20;
        return `left-[${percentage}%]`;
    };

    const generatedPrompt = getWritingPromptFromQuestions(questions);

    const saveToProfile = () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        saveProfile.set("true");
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="w-full text-left mb-8">
            <h2 class="text-lg font-bold text-gray-900">Your Unique Personality</h2>
        </div>
        {#each $quizQuestions as question}
            <div class="flex flex-row w-full items-center gap-2 m-2">
                <div class="w-[25%] text-right">
                    <p class="font-bold">{question.attribute1.title}</p>
                </div>
                <div class="w-[50%] px-4 lg:w-5/12">
                    <div class="bg-gray-200 dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
                        <div
                            class="bg-blue-500 absolute {questionAnswerToProgress(
                                question.answer
                            )} h-full w-[20%] rounded-2xl"
                        ></div>
                    </div>
                </div>
                <div class="w-[25%] text-left">
                    <p class="font-bold">{question.attribute2.title}</p>
                </div>
            </div>
        {/each}
        <div class="flow-root mb-4">
            <!-- <ul role="list" class="divide-y divide-gray-200">
                <li class="py-3 sm:py-4">
                    <PersonalityDescription 
                        title={"test"} 
                        description="Some description test that showcases the component" 
                        imageSrc={iconConfident.src}
                        />
                </li>
                <li class="py-3 sm:py-4">
                    <PersonalityDescription 
                        title={"test2"} 
                        description="Some description test that showcases the component" 
                        imageSrc={iconConfident.src}
                    />
                </li>
                <li class="py-3 sm:py-4">
                    <PersonalityDescription 
                        title={"test3"} 
                        description="Some description test that showcases the component" 
                        imageSrc={iconConfident.src}
                />
                </li>
            </ul> -->
        </div>
        <div class="w-full flex flex-row mt-8 justify-center">
            <ClipboardButton buttonText="Copy Prompt" textToCopy={generatedPrompt} />
            <a class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={saveToProfile} href="/save_profile">Save To Profile</a>
        </div>
    </div>
</div>
