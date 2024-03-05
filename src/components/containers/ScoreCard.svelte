<script lang="ts">
    export let title: string;
    export let attribute: string;
    export let value: number
    export let bgColor: string;
</script>

<div class="bg-white/90 border-0 p-4 shadow-md rounded-lg flex flex-col">
    <div class="flex flex-row gap-2 items-start mb-2">
        <img src="/card_icons/pink_yellow_1.svg" alt="Question Symbol" class="w-8 h-8 align-middle" />
        <span class="text-md font-medium text-gray-500 align-middle my-auto">{title}</span>
    </div>
    <div class="flex flex-row gap-4 align-bottom">
        <p><span class="text-5xl {bgColor}">{value.toString()}</span><span class="text-3xl {bgColor}">%</span></p>
        <span class="font-medium text-3xl {bgColor} mt-auto">{attribute}</span>
    </div>
</div>