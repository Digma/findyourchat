<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Question } from '../../../lib/personality/types';

    export let enableSubmit: boolean = true;
    export let questions: Question[] = [];
    export let englishAnswered: boolean = false;

    $: questionsToAnswer = questions.map((obj, idx) => ({ ...obj, index: idx })).filter((q) => !q.answer);

    // Dispatch to parent
    const dispatch = createEventDispatcher();

    const submitAnswers = () => {
        dispatch('submittedAnswers');
    }

    const scrollBackToAnswer = (index: number) => () => {
        dispatch('scrollPrev', index);
    }
</script>

<div class="w-full min-w-0 relative">
    <div class="flex flex-col items-center m-32">
        {#if enableSubmit}
            <h2 class="text-3xl font-bold text-black mb-4">Submit your answers</h2>
            <p class="text-lg text-black mb-4">You have completed the quiz. Please submit your answers to get your writing prompt.</p>
            <div class="rounded-md bg-blue-500">
                <a class="btn text-white font-bold" href="/results" on:click={submitAnswers}>Submit</a>
            </div>
        {:else}
            <h2 class="text-3xl font-bold text-black mb-4">Please answer all questions</h2>
            <p class="text-lg text-black mb-4">You must answer all questions before submitting.</p>
            <div class="flex flex-row flex-wrap justify-center">
                {#each questionsToAnswer as question}
                <div class="flex justify-between m-1">
                    <button class="btn text-white font-bold bg-primary-500" on:click={scrollBackToAnswer(question.index)}>{question.title}</button>
                </div>
                {/each}
                {#if !englishAnswered}
                <div class="flex justify-between m-1">
                    <button class="btn text-white font-bold bg-primary-500" on:click={scrollBackToAnswer(questions.length)}>"English Type"</button>
                </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
