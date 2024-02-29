<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { EnglishType } from "../../../lib/personality/types";
    const dispatch = createEventDispatcher();

    export let answer: string;

    Object.entries(EnglishType).forEach(([key, value]) => {
        console.log("EnglishType", key, value);
    });

    const buttonStyle = (value) => {
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
            <div class="w-full flex text-black max-w-[1024px]">
                <span class="font-semibold text-3xl mr-1 min-w-24 mt-0.5">11 →</span>
                <div class="w-full">
                    <h3 class="text-3xl font-semibold mb-8">Pick an english type</h3>
                    <div class="grid grid-cols-4 justify-center mb-4 min-h-16 gap-2">
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
