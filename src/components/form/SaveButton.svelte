<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";

    const dispatch = createEventDispatcher();

    const popupHover: PopupSettings = {
        event: "hover",
        target: "popupHover",
        placement: "bottom",
    };

    // This function dispatch the save event
    const save = () => {
        dispatch("save");
    }
</script>

<button
    class="bg-black hover:bg-gray-800 rounded text-white p-2 flex flex-row gap-2 focus:ring focus:ring-gray-300"
    use:popup={popupHover}
    on:click={save}
>
    <span
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  class="h-5 w-5" fill="currentColor">
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        
    </span>
    <span>Save</span>
</button>
<div class="card bg-white border-white rounded-md shadow-md p-4 variant-filled-secondary bg-bg-p min-w-44 max-w-72 text-sm font-light text-center" data-popup="popupHover">
    <p>Save the writing style to your profile</p>
    <div class="bg-white arrow variant-filled-secondary" />
</div>
