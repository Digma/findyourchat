<script lang="ts">
  export let tooltipText: string;
  export let position: string = "bottom";
</script>

<div class="group relative py-2">
  {#if position === "bottom"}
    <div
      class="absolute invisible top-10 group-hover:visible bg-white text-black px-4 mt-3 py-2 text-sm rounded-md m-auto z-20"
    >
      <p class="leading-2 text-gray-600 pt-2 pb-2">{tooltipText}</p>
      <svg
        class="absolute z-30 top-[-10px]"
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0L0 10L16 10L8 0Z" fill="white" />
      </svg>
    </div>
  {:else}
    <div
      class="absolute invisible bottom-10 group-hover:visible bg-white text-black px-4 mb-3 py-2 text-sm rounded-md m-auto z-20"
    >
      <p class="leading-2 text-gray-600 pt-2 pb-2">{tooltipText}</p>
      <svg
        class="absolute z-30 bottom-[-10px]"
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white" />
      </svg>
    </div>
  {/if}
  <div class="">
    <slot />
  </div>
</div>
