<script lang="ts">
  export let title: string;
  export let attribute: string;
  export let value: number;
  export let bgColor: string;
  export let iconPath: string | undefined = undefined;

  const iconPathNonNull = iconPath ? iconPath : "/card_icons/pink_yellow_1.svg";
</script>

<div
  id="scorecard-{title}"
  class="w-full h-full bg-white/90 border-0 p-3 shadow-md rounded-xl"
>
  <div class="flex flex-col">
    <div class="flex flex-row gap-2 items-start justify-between">
      <span class="text-sm md:text-md font-medium text-gray-500 align-middle"
        >{title}</span
      >
      <img
        src={iconPathNonNull}
        alt="Question Symbol"
        class="w-12 h-12 -mt-3 -mr-1 align-middle"
      />
    </div>
    <div class="flex flex-row gap-3 align-bottom">
      <p>
        <span class="text-xl sm:text-xl md:text-xl lg:text-2xl {bgColor}"
          >{value.toString()}</span
        ><span class="sm:text-md md:text-xl lg:text-xl {bgColor}">%</span>
      </p>
      <span
        class="font-medium text-xl sm:text-xl md:text-xl lg:text-xl {bgColor} mt-auto"
        >{attribute}</span
      >
    </div>
  </div>
</div>
