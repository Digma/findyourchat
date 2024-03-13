<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { EnglishType } from "../../../lib/personality/types";
    const dispatch = createEventDispatcher();

    export let answer: string | undefined = undefined;

    const buttonStyle = (value: string) => {
        if (answer === value) {
            return `bg-white hover:bg-white border-orange-500 border-double border-4`;
        } else {
            return "bg-white/25 hover:bg-white/40 border-2 border-white";
        }
    };

    const valueSelected = (value: string) => () => {
        dispatch("valuePicked", value);
    };
</script>

<section class="snap-start h-screen w-full flex items-center justify-center p-4">
    <div class="w-full h-screen flex items-center justify-center p-4">
        <div class="w-full p-8 rounded-lg">
            <div class="w-full flex flex-col sm:flex-row text-black max-w-[1024px]">
                <div class="flex flex-row font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 mr-1 mt-0.5 gap-1">
                    <span class="">11</span>
                    <span class="sm:min-w-24">→</span>
                </div>
                <div class="w-full">
                    <h3 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-8">Please choose your preferred variant of English</h3>
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mb-4 min-h-16 gap-2">
                        {#key answer}
                            {#each Object.entries(EnglishType) as [key, value]}
                                <button
                                    class="w-44 font-bold {buttonStyle(value)} px-4 py-1 rounded"
                                    on:click={valueSelected(value)}>{value}</button
                                >
                            {/each}
                        {/key}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
