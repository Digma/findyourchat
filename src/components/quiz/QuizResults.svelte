<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import SaveButton from "../form/SaveButton.svelte";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { quizQuestions, saveProfile, editProfile, englishType } from "../../lib/store.ts";
    import { textColors, backgroundColors } from "../../lib/personality/color.ts";

    const questions = [...$quizQuestions];
    editProfile.set("false");

    const generatedPrompt = getWritingPromptFromQuestions(questions);

    const saveToProfile = () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        saveProfile.set("true");
    };

    // Progress bar
    const progressPercentage = (answer: number|undefined) => {
        if (!answer) return "0%";
        const percentage = (answer - 1) * 25;
        return `${percentage}%`;
    };

    const progressPercentageInverse = (answer: number|undefined) => {
        if (!answer) return "0%";
        const percentage = 100 - (answer - 1) * 25;
        return `${percentage}%`;
    };

    const progressBarStart = (answer: number|undefined) => {
        if (!answer) return "0%";
        if (answer === 1) {
            return "0%";
        } else if (answer === 2) {
            return "20%";
        } else if (answer === 3) {
            return "40%";
        } else if (answer === 4) {
            return "40%";
        } else {
            return "40%";
        }
    };

    const progressBarWidth = (answer: number|undefined) => {
        if (!answer) return "0%";
        if (answer === 1) {
            return "60%";
        } else if (answer === 2) {
            return "40%";
        } else if (answer === 3) {
            return "20%";
        } else if (answer === 4) {
            return "40%";
        } else {
            return "60%";
        }
    };

    const attribute1Color = (answer: number|undefined, index: number) => {
        if (!answer) return "text-gray-300";
        else if (answer <= 3) return textColors[index + 1];
        else return "text-gray-300";
    };

    const attribute2Color = (answer: number|undefined, index: number) => {
        if (!answer) return "text-gray-300";
        if (answer >= 3) return textColors[index + 1];
        else return "text-gray-300";
    };

    const percentage1Color = (answer: number|undefined) => {
        if (!answer) return "text-gray-500";
        else if (answer <= 3) return "text-black";
        else return "text-gray-500";
    };

    const percentage2Color = (answer: number|undefined) => {
        if (!answer) return "text-gray-500";
        else if (answer >= 3) return "text-black";
        else return "text-gray-500";
    };
</script>

<div class="w-full bg-white text-gray-800 px-6 max-w-[800px] m-auto rounded">
    <div class="w-full p-2 sm:p-2 flex flex-col gap-2">
        <!-- <div class="w-full text-left">
            <h2 class="text-3xl font-bold text-black">Your Unique Personality</h2>
        </div> -->
        <div class="flex flex-row items-center justify-between mt-4 mb-4 gap-4">
            <div class="flex flex-row items-center gap-4">
                <p class="text-left text-black font-bold text-2xl uppercase">Your Writing Style</p>
            </div>
            <div class="flex flex-row items-center gap-4">
                <ClipboardButton textToCopy={generatedPrompt} />
                <a class="flex flex-row gap-2 place-self-end" href="/profile">
                    <SaveButton on:save={saveToProfile} />
                </a>
            </div>
        </div>

        <div class="rounded w-32 text-left text-sm">
            <h1
                class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
                🗣️ {$englishType}
            </h1>
        </div>
        {#each questions as question, idx}
            {#if idx == 0}
                <div class="mt-4 mb-4">
                    <p class="text-gray-500 font-bold text-2xl">Personality Traits 🌟</p>
                </div>
            {/if}
            {#if idx == 6}
                <div class="mt-8 mb-4">
                    <p class="text-left font-bold text-gray-500 text-2xl">Tone 🎤</p>
                </div>
            {/if}
            <div class="w-full mb-4">
                <div class="flex justify-between items-center mt-0.5">
                    <div class="text-lg font-semibold {attribute1Color(question.answer, idx)}">
                        {question.attribute1.title}
                    </div>
                    <div class="text-lg font-semibold {attribute2Color(question.answer, idx)}">
                        {question.attribute2.title}
                    </div>
                </div>
                <!-- <div class="text-xs uppercase font-semibold mb-2">Mind</div> -->
                <div class="flex flex-row items-center gap-2">
                    <div
                        class="bg-gray-200 flex flex-row justify-between items-center relative h-4 w-full rounded-2xl"
                    >
                        <p class="ml-2 text-sm font-bold z-10 {percentage1Color(question.answer)}">
                            {progressPercentageInverse(question.answer)}
                        </p>
                        <div
                            id="progress-bar-q-{question.attribute1.title}"
                            class="{backgroundColors[idx + 1]} absolute h-full w-[20%] rounded-2xl"
                            style:left={progressBarStart(question.answer)}
                            style:width={progressBarWidth(question.answer)}
                        />
                        <p class="mr-2 text-sm font-bold z-10 {percentage2Color(question.answer)}">
                            {progressPercentage(question.answer)}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
