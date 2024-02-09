<script lang="ts">
    import CardPickerInteractive from "../cards/CardPickerInteractive.svelte";
    import QuizResults from "./QuizResults.svelte";
    let isEmpty: boolean = false;
</script>

{#if !isEmpty}
    <CardPickerInteractive bind:isEmpty={isEmpty} />
{:else}
    <QuizResults />
    <!-- <div class="rounded bg-gray-200 p-4">
        <h1 class="text-2xl font-bold">Title</h1>
        <p class="text-gray-700">Description</p>
    </div>
	<p>Empty deck</p> -->
{/if}
