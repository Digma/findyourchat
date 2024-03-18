<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Question } from "../../../lib/personality/types";

    export let enableSubmit: boolean = true;
    export let answers: Question[] = [];
    export let englishAnswered: boolean = false;
    export let resultUrl: string = "";

    $: emptyAnswers = answers.map((obj, idx) => ({ ...obj, index: idx })).filter((q) => !q.answer);

    // Dispatch to parent
    const dispatch = createEventDispatcher();

    const submitAnswers = () => {
        dispatch("submittedAnswers");
    };

    const scrollBackToAnswer = (index: number) => () => {
        dispatch("scrollPrev", index);
    };
</script>

<div class="w-full min-w-0 relative">
    <div class="flex flex-col items-center m-32">
        {#if enableSubmit}
            <h2 class="text-3xl font-bold text-black mb-4">Submit your answers</h2>
            <p class="text-lg text-center italic text-black mb-4">
                You have completed the quiz 🎉 <br /> If you are done, click on the Submit button
            </p>
            <div class="mt-4 min-w-72 text-center rounded-md bg-black">
                <a class="btn text-white font-bold" href={resultUrl} on:click={submitAnswers}
                    >Submit</a
                >
            </div>
        {:else}
            <h2 class="text-3xl font-bold text-black mb-4">Please answer all questions</h2>
            <p class="text-lg text-black mb-4">You must answer all questions before submitting.</p>
            <div class="flex flex-row flex-wrap justify-center">
                {#each emptyAnswers as answer}
                    <div class="flex justify-between m-1">
                        <button
                            class="btn text-white font-bold bg-primary-500"
                            on:click={scrollBackToAnswer(answer.index)}>{answer.title}</button
                        >
                    </div>
                {/each}
                {#if !englishAnswered}
                    <div class="flex justify-between m-1">
                        <button
                            class="btn text-white font-bold bg-primary-500"
                            on:click={scrollBackToAnswer(answers.length)}>"English Type"</button
                        >
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
