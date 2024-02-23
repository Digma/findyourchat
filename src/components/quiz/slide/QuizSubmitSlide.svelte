<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    // Dispatch to parent
    const dispatch = createEventDispatcher();

    const submitAnswers = () => {
        dispatch('submittedAnswers');
    }
</script>

<div class="embla__slide flex-none w-full min-w-0 relative">
    <div class="flex flex-col items-center m-32">
        <h2 class="text-3xl font-bold text-white mb-4">Submit your answers</h2>
        <p class="text-lg text-white mb-4">You have completed the quiz. Please submit your answers to get your writing prompt.</p>
        <a class="btn" href="/results" on:click={submitAnswers}>Submit</a>
    </div>
</div>
