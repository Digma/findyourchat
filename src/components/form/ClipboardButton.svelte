<script lang="ts">
    import Tooltip from "../containers/Tooltip.svelte";

    export let textToCopy: string;
    export let tooltipText: string | undefined = undefined;

    // This function will be called when the user clicks the button
    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            console.log("Text copied to clipboard");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
        tooltipText = "Copied!";
    }
</script>

<!-- This button calls the copyTextToClipboard function with the text to copy when clicked -->
{#if tooltipText}
<Tooltip tooltipText={tooltipText}>
    <button
    class="bg-blue-accent/95 hover:bg-gray-800 rounded text-white p-1 px-2 flex flex-row gap-2 focus:ring focus:ring-gray-300"
    on:click={() => copyTextToClipboard(textToCopy)}
>
    <span
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 448 512"
            fill="currentColor"
            ><path
                d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
            /></svg
        >
    </span>
    <span>Copy Prompt</span>
</button>
</Tooltip>
{:else}
    <button
        class="bg-blue-accent/95 hover:bg-gray-800 rounded text-white p-1 px-2 flex flex-row gap-2 focus:ring focus:ring-gray-300"
        on:click={() => copyTextToClipboard(textToCopy)}
    >
        <span
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 448 512"
                fill="currentColor"
                ><path
                    d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                /></svg
            >
        </span>
        <span>Copy Prompt</span>
    </button>
{/if}

