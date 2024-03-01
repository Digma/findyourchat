<script lang="ts">
    import { popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";

    const popupHover: PopupSettings = {
        event: "hover",
        target: "popupHover",
        placement: "bottom",
    };

    export let textToCopy: string;

    let PopoverContent = "Copy to Clipboard";

    // This function will be called when the user clicks the button
    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            console.log("Text copied to clipboard");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
        PopoverContent = "Copied to clipboard!";
    }
</script>

<!-- This button calls the copyTextToClipboard function with the text to copy when clicked -->
<button
    class="bg-black hover:bg-gray-800 rounded text-white p-2 flex flex-row gap-2 focus:ring focus:ring-gray-300"
    use:popup={popupHover}
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
<div class="card bg-white border-white rounded-md shadow-md p-4 variant-filled-secondary bg-bg-p min-w-44 max-w-72 text-sm font-light text-center" data-popup="popupHover">
    <p>Copy the prompt to clipboard to easily use it in ChatGPT or HuggingChat</p>
    <div class="bg-white arrow variant-filled-secondary" />
</div>
