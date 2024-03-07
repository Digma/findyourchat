<script lang="ts">
    import ClipboardButton from "../form/ClipboardButton.svelte";
    import SaveButton from "../form/SaveButton.svelte";
    import ScoreCard from "../containers/ScoreCard.svelte";
    import Tooltip from "../containers/Tooltip.svelte";

    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { currentWritingStyle, saveProfile, editProfile } from "../../lib/store.ts";
    import { textColors } from "../../lib/personality/color.ts";

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
    <div class="w-full p-1 sm:p-2 flex flex-col gap-2">
        <!-- <div class="w-full text-left">
            <h2 class="text-3xl font-bold text-black">Your Unique Personality</h2>
        </div> -->
        <div class="mt-4 mb-4">
            <div class="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between mb-4 m-auto gap-4">
                <div class="flex flex-row gap-4 my-auto">
                    <p class="text-black font-bold text-2xl uppercase">Your Writing Style</p>
                </div>
                <div class="flex flex-row gap-4">
                    <ClipboardButton textToCopy={generatedPrompt} tooltipText={"Copy the Prompt so you can super easily use your personality in ChatGPT or other LLM. 😊"} />
                    <a class="flex flex-row gap-2 place-self-end" href="/profile">
                        <SaveButton on:save={saveToProfile} />
                    </a>
                </div>
            </div>
            <div class="mb-4 mt-4 p-2 rounded bg-white/50">
                <p class="text-sm">To use it, <b>simply copy the prompt using the "Copy Prompt" button</b> or <b>check our documentation</b> for <a href="/doc/chatgpt-guide" class="text-blue-500">ChatGPT</a>, <a href="/doc/huggingchat-guide" class="text-blue-500">HuggingChat</a>, <a href="/doc/google-gemini-guide" class="text-blue-500">Google Gemini</a> or <a href="/doc/copilot-guide" class="text-blue-500">Microsoft Copilot</a>.</p>
            </div>
            <!-- <div class="flex-grow border-t border-gray-200/50"></div> -->
        </div>
        {#if $currentWritingStyle}
        <div class="mt-2 flex flex-col sm:flex-row">
            <div class="max-w-72 flex flex-row">
                <Tooltip tooltipText="This refers to the differences in the English language accross the world." position="top">
                    <p class="text-gray-700 font-bold text-2xl">English Variety —</p>
                </Tooltip>
            </div>
            <div class="rounded text-left text-sm sm:ml-2 mt-2.5">
                <span class="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-md sm:text-lg font-bold px-3 py-1">{$currentWritingStyle.englishType} (English)</span>
            </div>
        </div>
    <div class="mt-4 mb-4">
        <p class="text-gray-700 font-bold text-2xl">Personality Traits</p>
        <p>Your personality, a reflection of you, your personality</p>
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {#each $currentWritingStyle.answers.slice(0, 6) as question, idx}
        <ScoreCard
        title={question.title}
        attribute={getAttributeName(idx, question.answer)}
        value={getAttributePercentage(question.answer)}
        bgColor={getAttributeColor(idx)}
        iconPath={question.iconPath}
        />
        {/each}
    </div>
    <div class="mt-12 mb-4">
        <p class="text-left font-bold text-gray-700 text-2xl">Tone of Voice</p>
        <p>Your tone may vary based on the situation, it is shaped by your intent and who you are addressing</p>
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {#each $currentWritingStyle.answers.slice(6, 10) as question, idx}
        <ScoreCard
        title={question.title}
        attribute={getAttributeName(idx+6, question.answer)}
        value={getAttributePercentage(question.answer)}
        bgColor={getAttributeColor(idx+6)}
        iconPath={question.iconPath}
        />
        {/each}
    </div>
        {:else}
            <div class="w-full flex flex-col items-center justify-center">
                <p class="text-lg text-gray-500">No writing style found</p>
            </div>
        {/if}
    </div>
</div>
