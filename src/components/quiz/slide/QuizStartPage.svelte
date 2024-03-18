<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isEdit = false;
    const dispatch = createEventDispatcher();

    const handleKeydown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
                dispatchStart();
                break;
            default:
                break;
        }
    };

    const dispatchStart = () => {
        dispatch("start");
    };
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="h-screen flex flex-col items-center justify-center text-center p-4">
    <div class="max-w-96 flex flex-col items-center justify-center text-black">
        <div class="mb-8">
            <img src="/logo.png" alt="Logo" class="mx-auto h-24" />
        </div>

        <!-- Clock icon SVG -->

        <h1 class="text-2xl font-bold mb-4">Get your Writing Style</h1>
        <p class="mb-8 text-black">
            Through a quick quiz, we will determine your writing style and provide you with a
            writing prompt.
        </p>

        <!-- Start button -->
        <button
            id="startButton"
            class="min-w-72 bg-black text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-opacity-90"
            type="button"
            on:click={dispatchStart}
        >
            {#if isEdit}
                Edit Profile
            {:else}
                Start
            {/if}
        </button>

        <div class="flex mt-4 gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mb-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0-4 2M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                ></path>
            </svg>
            <p class="text-xs cursor-pointer">Takes 4 minutes</p>
        </div>
    </div>
</div>
