<script lang="ts">
    export let textToCopy: string;

    // This function will be called when the user clicks the button
    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
</script>

<!-- This is the text you want to copy to the clipboard -->
<p>Text to be copied: "{textToCopy}"</p>

<!-- This button calls the copyTextToClipboard function with the text to copy when clicked -->
<button 
    data-popover-target="popover-default"
    type="button"
    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    on:click={() => copyTextToClipboard(textToCopy)}>
    Copy to Clipboard
</button>