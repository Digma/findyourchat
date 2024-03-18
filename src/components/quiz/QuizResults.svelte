<script lang="ts">
    import X from "../social/X.svelte";
    import Reddit from "../social/Reddit.svelte";
    import LinkedIn from "../social/LinkedIn.svelte";
    import CopyButtonWithOptions from "../form/CopyButtonWithOptions.svelte";
    import SaveButton from "../form/SaveButton.svelte";
    import EditButton from "../form/EditButton.svelte";
    import ScoreCard from "../containers/ScoreCard.svelte";
    import Tooltip from "../containers/Tooltip.svelte";
    import InlineInput from "../containers/InlineInput.svelte";

    import { getWritingPromptFromQuestions } from "../../lib/personality/prompt.ts";
    import { currentWritingStyle, saveProfile, editProfile } from "../../lib/store.ts";
    import { textColors } from "../../lib/personality/color.ts";
    import { urlToWritingStyle } from "../../lib/personality/url.ts";
    import { createDefaultNameFromQuestion } from "../../lib/personality/naming.ts";

    const colorOptionLength = textColors.length;
    editProfile.set("false");

    const writingStyle = urlToWritingStyle(window.location.search);
    const writingStyleDefined = writingStyle && writingStyle.answers.every((a) => a.answer);
    const generatedPrompt = writingStyleDefined ? getWritingPromptFromQuestions(writingStyle) : "";
    const profileExists = writingStyle.id && writingStyle.id !== "" ? true : false;
    const profileName =
        writingStyle.name && writingStyle.name !== ""
            ? writingStyle.name
            : createDefaultNameFromQuestion(writingStyle.answers);
    // Social sharing buttons
    const url = window.location.href.split("?")[0];
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("id");
    searchParams.delete("name");
    const searchParamsString = searchParams.toString();
    const title = "Check my ChatGPT Writing Style ✍️";

    const saveToProfile = () => {
        // Questions will be saved on the profile page
        // That avoids issues with redirecting for unlogged users
        if (!writingStyle.name || writingStyle.name === "") {
            writingStyle.name = profileName;
        }
        currentWritingStyle.set(writingStyle);
        saveProfile.set("true");
    };

    const saveProfileToEdit = () => {
        currentWritingStyle.set(writingStyle);
        editProfile.set("true");
    };

    const updateProfileName = async (e: CustomEvent<string>) => {
        if (e.detail && e.detail != "") {
            writingStyle.name = e.detail;
        } else {
            console.error("Invalid name for profile");
        }
    };

    const getAttributeColor = (index: number | undefined) => {
        if (!index) return "text-gray-600";
        else return textColors[index % colorOptionLength];
    };

    const getAttributeName = (ix: number, answer: number | undefined) => {
        if (!answer) return "_";

        const mostScoredAttributeIndex = answer <= 3 ? "attribute1" : "attribute2";
        const attribute = writingStyle.answers[ix][mostScoredAttributeIndex].title;

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

<div class="w-full text-gray-800 px-6 max-w-[1220px] m-auto rounded mt-8">
    {#if !writingStyleDefined}
        <div class="w-full flex flex-col items-center justify-center">
            <p class="text-lg text-gray-500">No writing style found</p>
            <p class="text-lg text-gray-500">
                Try to <a href="/quiz" class="text-blue-500">take the quiz</a> to generate a writing
                style
            </p>
        </div>
    {:else}
        <div class="w-full p-1 sm:p-2 flex flex-col gap-2">
            <!-- <div class="w-full text-left">
            <h2 class="text-3xl font-bold text-black">Your Unique Personality</h2>
        </div> -->
            <div class="mt-4 mb-4">
                <div
                    class="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between m-auto gap-4 align-top"
                >
                    <div class="flex flex-col gap-4 py-2 items-start">
                        <div class="flex flex-row group max-w-96">
                            <InlineInput
                                value={profileName}
                                on:blur={updateProfileName}
                                labelClasses="text-purple-700 font-bold text-3xl uppercase align-middle m-auto"
                                inputClasses="text-black font-bold text-2xl uppercase align-middle m-auto"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                class="mt-2 ml-2 h-5 w-5 text-white hidden group-hover:block"
                                stroke="currentColor"
                            >
                                <path
                                    fill="#fffff"
                                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <CopyButtonWithOptions tooltipText={generatedPrompt} />
                        {#if profileExists}
                            <div class="flex flex-row gap-2 place-self-end self-start">
                                <EditButton on:edit={saveProfileToEdit} />
                            </div>
                        {/if}
                        <div class="flex flex-row gap-2 place-self-end self-start">
                            <SaveButton on:save={saveToProfile} />
                        </div>
                    </div>
                </div>
                <div class="mb-4 p-2 py-4 rounded bg-white/50 mt-4">
                    <p class="text-sm">
                        To use it, <b>simply copy the prompt using the "Copy Prompt" button</b>
                        or <b>check our documentation</b> for
                        <a href="/doc/chatgpt-guide" class="text-blue-500">ChatGPT</a>,
                        <a href="/doc/huggingchat-guide" class="text-blue-500">HuggingChat</a>,
                        <a href="/doc/google-gemini-guide" class="text-blue-500">Google Gemini</a>
                        or
                        <a href="/doc/copilot-guide" class="text-blue-500">Microsoft Copilot</a>.
                    </p>
                </div>
                <!-- <div class="flex-grow border-t border-gray-200/50"></div> -->
            </div>
            {#if writingStyle}
                <div class="mt-2 flex flex-col sm:flex-row">
                    <div class="max-w-72 flex flex-row">
                        <Tooltip
                            tooltipText="This refers to the differences in the English language accross the world."
                            position="top"
                        >
                            <p class="text-black font-bold text-2xl mr-2">English Variety</p>
                        </Tooltip>
                    </div>
                    <div class="rounded text-left text-sm sm:ml-2 mt-2.5">
                        <span
                            class="bg-purple-100 border-purple-200 border text-gray-600 rounded-full text-md sm:text-lg font-bold px-3 py-1"
                            >{writingStyle.englishType} (English)</span
                        >
                    </div>
                </div>
                <div class="flex flex-col md:flex-row mt-8 gap-4">
                    <!-- Personality Traits -->
                    <div class="flex flex-col md:w-1/2">
                        <div class="mb-2 min-h-24">
                            <p class="text-black font-bold text-2xl mb-2">Personality Traits</p>
                            <p>
                                Your personality, a reflection of you shaped by who you are and how
                                people perceive you
                            </p>
                        </div>
                        <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                            {#each writingStyle.answers
                                .slice(0, 6)
                                .sort((a, b) => (b.answer || 0) - (a.answer || 0)) as question, idx}
                                <ScoreCard
                                    title={question.title}
                                    attribute={getAttributeName(idx, question.answer)}
                                    value={getAttributePercentage(question.answer)}
                                    bgColor={getAttributeColor(idx)}
                                    iconPath={question.iconPath}
                                />
                            {/each}
                        </div>
                    </div>
                    <!-- Tone -->
                    <div class="flex flex-col md:w-1/2">
                        <div class="mb-2 min-h-24">
                            <p class="text-left font-bold text-black text-2xl mb-2">
                                Tone of Voice
                            </p>
                            <p>
                                Your tone may vary based on the situation, it is shaped by your
                                intent and who you are addressing
                            </p>
                        </div>
                        <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                            {#each writingStyle.answers
                                .slice(6, 10)
                                .sort((a, b) => (b.answer || 0) - (a.answer || 0)) as question, idx}
                                <ScoreCard
                                    title={question.title}
                                    attribute={getAttributeName(idx + 6, question.answer)}
                                    value={getAttributePercentage(question.answer)}
                                    bgColor={getAttributeColor(idx + 6)}
                                    iconPath={question.iconPath}
                                />
                            {/each}
                        </div>
                    </div>
                </div>
            {:else}
                <div class="w-full flex flex-col items-center justify-center">
                    <p class="text-lg text-gray-500">No writing style found</p>
                </div>
            {/if}
        </div>
        <div class="w-full flex flex-col items-center justify-center mt-16 mb-16">
            <div class="w-full flex flex-col justify-center items-center gap-2">
                <p class="text-md text-gray-800 italic">Share your Writing Style</p>
                <div>
                    <Reddit
                        class="share-button rounded-lg h-10"
                        {title}
                        {url}
                        parameters={searchParamsString}
                    />
                    <LinkedIn
                        class="share-button rounded-lg h-10"
                        {url}
                        parameters={searchParamsString}
                    />
                    <X
                        class="share-button rounded-lg h-10"
                        text={title}
                        {url}
                        parameters={searchParamsString}
                        hashtags="ChatGPT"
                        related="other,users"
                    />
                </div>
            </div>
        </div>
    {/if}
</div>
