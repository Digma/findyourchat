<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { quizQuestions, saveProfile, editProfile, englishType } from "../../lib/store.ts";

    const questions = [...$quizQuestions];
    editProfile.set("false");

    const generatedPrompt = getWritingPromptFromQuestions(questions);

    const saveToProfile = () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        saveProfile.set("true");
    };

    // Progress bar
    const questionAnswerToProgress = (answer: number) => {
        const percentage = (answer - 1) * 20;
        return percentage;
    };
</script>

<div class="flex flex-row justify-center m-4">
    <div
        class="w-full p-4 sm:p-8 flex flex-col justify-center items-center"
    >
        <div class="w-full text-center mb-8">
            <h2 class="text-3xl font-bold text-white">Your Unique Personality</h2>
        </div>
        <div class="mt-4 mb-4">
            <p class="text-center text-black font-bold text-2xl">English Type</p>
        </div>
        <div class="flex flex-row w-full items-center gap-2 m-2">
            <div class="w-[25%] text-right text-white">
                <p class="font-bold">{$englishType}</p>
            </div>
        </div>
        {#each $quizQuestions as question, idx}
            {#if idx == 0}
                <div class="mt-4 mb-4">
                    <p class="text-center text-black font-bold text-2xl">Personality Traits</p>
                </div>
            {/if}
            {#if idx == 6}
            <div class="mt-8 mb-4">
                <p class="text-center font-bold text-black text-2xl">Tone</p>
            </div>
            {/if}
            <div class="flex flex-row w-full items-center gap-2 m-2">
                <div class="w-[25%] text-right text-white">
                    <p class="font-bold">{question.attribute1.title}</p>
                </div>
                <div class="w-[50%] px-4 lg:w-5/12">
                    <div class="bg-gray-200 relative h-4 w-full rounded-2xl">
                        <div
                            id="progress-bar-q-{question.attribute1.title}"
                            class="bg-yellow-accent absolute h-full w-[20%] rounded-2xl"
                            style:left="{questionAnswerToProgress(question.answer)}%"
                        />
                    </div>
                </div>
                <div class="w-[25%] text-left text-gray-300">
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
            <a class="bg-rose-accent text-white px-4 py-2 rounded-lg" on:click={saveToProfile} href="/profile">Save To Profile</a>
        </div>
    </div>
</div>
