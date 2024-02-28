<script context="module" lang="ts">
    export type Props = { id: string; selectedValue: number | undefined;};
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let id: Props["id"];
    export let selectedValue: Props["selectedValue"];

    const dispatch = createEventDispatcher();
    let borderColor = "border-gray-300";

    function handleSelect(value: number) {
      console.log("ValueSelected Scale", selectedValue);
      dispatch('valuePicked', value);
    }

    function valueToSize(value: number) {
        if (value === 1 || value === 5) {
            return 16;
        } else if (value === 2 || value === 4) {
            return 12;
        } else {
            return 8;
        }
    }
</script>

<div class="flex gap-x-2 scale p-2 min-w-32 items-center">
  {#each [1, 2, 3, 4, 5] as value}
    {@const size = valueToSize(value)}
    <label for="radio-button-{id}-{value}" class="radio-button-label cursor-pointer bg-transparent rounded-full py-2">
      <input
        type="radio"
        name="{id}"
        checked={selectedValue === value}
        id="radio-button-{id}-{value}"
        value={value}
        class="radio-button h-{size} w-{size} cursor-pointer border-2 {borderColor}
         checked:bg-blue-400 hover:bg-blue-200 checked:hover:bg-blue-400"
         on:input="{() => handleSelect(value)}"
      />
    </label>
  {/each}
</div>
