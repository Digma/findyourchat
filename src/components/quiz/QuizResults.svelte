<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import SaveButton from "../form/SaveButton.svelte";
    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { currentWritingStyle, saveProfile, editProfile } from "../../lib/store.ts";
    import { textColors, backgroundColors } from "../../lib/personality/color.ts";
    import ScoreCard from "../containers/ScoreCard.svelte";

    const colorOptionLength = textColors.length;
    editProfile.set("false");

    const generatedPrompt = $currentWritingStyle
        ? getWritingPromptFromQuestions($currentWritingStyle)
        : "";

    const saveToProfile = () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        saveProfile.set("true");
    };

    // Progress bar
    const progressPercentage = (answer: number | undefined) => {
        if (!answer) return "0%";
        const percentage = (answer - 1) * 25;
        return `${percentage}%`;
    };

    const progressPercentageInverse = (answer: number | undefined) => {
        if (!answer) return "0%";
        const percentage = 100 - (answer - 1) * 25;
        return `${percentage}%`;
    };

    const getAttributeColor = (index: number | undefined) => {
        if (!index) return "text-gray-600";
        else return textColors[index % colorOptionLength];
    };

    const getAttributeName = (ix: number, answer: number | undefined) => {
        if (!answer) return "_";

        const mostScoredAttributeIndex = answer <= 3 ? "attribute1" : "attribute2";
        const attribute = $currentWritingStyle?.answers[ix][mostScoredAttributeIndex].title;

        if (!attribute) return "_";

        return attribute;
    };

    const getAttributePercentage = (answer: number | undefined) => {
        if (!answer) return 0;
        if (answer === 1) {
            return 100;
        } else if (answer === 2) {
            return 75;
        } else if (answer === 3) {
            return 50;
        } else if (answer === 4) {
            return 75;
        } else {
            return 100;
        }
    };
</script>

<div class="w-full text-gray-800 px-6 max-w-[800px] m-auto rounded">
    <div class="w-full p-2 sm:p-2 flex flex-col gap-2">
        <!-- <div class="w-full text-left">
            <h2 class="text-3xl font-bold text-black">Your Unique Personality</h2>
        </div> -->
        <div class="flex flex-row items-center m-auto mt-4 mb-4 gap-4">
            <div class="flex flex-row items-center gap-4">
                <p class="text-center text-black font-bold text-2xl uppercase">Your Writing Style is:</p>
            </div>
        </div>
        {#if $currentWritingStyle}
        <div class="rounded w-32 text-left text-sm m-auto">
            <h1
            class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
            🗣️ {$currentWritingStyle.englishType}
        </h1>
    </div>
    <div class="mt-12 mb-4 m-auto">
        <p class="text-black font-bold text-4xl">Personality Traits</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
        {#each $currentWritingStyle.answers.slice(0, 6) as question, idx}
        <ScoreCard
        title={question.title}
        attribute={getAttributeName(idx, question.answer)}
        value={getAttributePercentage(question.answer)}
        bgColor={getAttributeColor(idx)}
        />
        {/each}
    </div>
    <div class="mt-12 mb-4 m-auto">
        <p class="text-left font-bold text-black text-4xl">Tone of Voice</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
        {#each $currentWritingStyle.answers.slice(6, 10) as question, idx}
        <ScoreCard
        title={question.title}
        attribute={getAttributeName(idx, question.answer)}
        value={getAttributePercentage(question.answer)}
        bgColor={getAttributeColor(idx)}
        />
        {/each}
    </div>
    <div class="mt-12 flex flex-row items-center gap-4 m-auto">
        <ClipboardButton textToCopy={generatedPrompt} />
        <a class="flex flex-row gap-2 place-self-end" href="/profile">
            <SaveButton on:save={saveToProfile} />
        </a>
    </div>
        {:else}
            <div class="w-full flex flex-col items-center justify-center">
                <p class="text-lg text-gray-500">No writing style found</p>
            </div>
        {/if}
    </div>
</div>
