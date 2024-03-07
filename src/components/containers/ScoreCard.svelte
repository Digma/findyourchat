<script lang="ts">
    export let title: string;
    export let attribute: string;
    export let value: number
    export let bgColor: string;
    export let iconPath: string | undefined = undefined;

    const iconPathNonNull = iconPath ? iconPath : "/card_icons/pink_yellow_1.svg";


</script>

<div id="scorecard-{title}" class="bg-white/90 border-0 p-3 shadow-md rounded-lg flex flex-col">
    <div class="flex flex-row gap-2 items-start justify-between">
        <span class="text-md font-medium text-gray-500 align-middle">{title}</span>
        <img src="{iconPathNonNull}" alt="Question Symbol" class="w-12 h-12 -mt-3 -mr-1 align-middle" />
    </div>
    <div class="flex flex-row gap-3 align-bottom">
        <p><span class="sm:text-2xl md:text-3xl lg:text-5xl {bgColor}">{value.toString()}</span><span class="sm:text-xl md:text-2xl lg:text-3xl {bgColor}">%</span></p>
        <span class="font-medium sm:text-xl md:text-2xl lg:text-3xl {bgColor} mt-auto">{attribute}</span>
    </div>
</div>