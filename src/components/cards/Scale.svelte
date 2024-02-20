<script context="module" lang="ts">
    export type Props = { id: string; };
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let id: Props["id"];

    const dispatch = createEventDispatcher();
    let selectedValue: number | null; 
    let borderColor = "border-gray-300";

    function handleSelect(value: number) {
        selectedValue = value;
        dispatch('scrollToNext');
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

<div class="scale p-2">
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
