<script lang="ts">
    import PersonalityDescription from "../containers/PersonalityDescription.svelte";
    import ClipboardButton from "../form/ClipboardButton.svelte";
    // TODO: Placeholder
    import iconConfident from "../../assets/card_icons/pink_yellow_4.svg";

    import {
        getWritingPromptFromQuestions,
        checkIfAllQuestionsAnswered,
    } from "../../lib/personality/prompt.ts";
    import { quizQuestions } from "../../lib/store.ts";
    import { submitWritingStyle } from "../../lib/api/fetch.ts";

    const questionResult: string = $quizQuestions.map((q) => q.title).join(".");
    const questionAnswerToProgress = (answer: number) => {
        const percentage = (answer - 1) * 20;
        return `left-[${percentage}%]`;
    };

    const generatedPrompt = getWritingPromptFromQuestions($quizQuestions);

    const saveQuestionsToDB = async () => {
        console.log("saving questions to db");
        const allQuestionAnswered = checkIfAllQuestionsAnswered($quizQuestions);
        if (allQuestionAnswered) {
            const response = await submitWritingStyle($quizQuestions);
            console.log("response: ", response);
        }
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="mb-4 text-center">
            <h2 class="text-lg font-medium text-gray-900">Your Unique Personality</h2>
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
        <ClipboardButton buttonText="Copy Prompt" textToCopy={generatedPrompt} />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={saveQuestionsToDB}>Save Prompt</button>
    </div>
</div>