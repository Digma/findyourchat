<script context="module" lang="ts">
    export type Props = { selectedValue: number | null;};
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let enableSubmit: boolean = true;

    // Dispatch to parent
    const dispatch = createEventDispatcher();

    const submitAnswers = () => {
        dispatch('submittedAnswers');
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
        {/if}
    </div>
</div>
