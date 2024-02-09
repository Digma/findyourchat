<script lang="ts">
    import { Popover, Button } from 'flowbite-svelte';

    export let buttonText: string
    export let textToCopy: string;

    let PopoverContent = "Copy to Clipboard";

    // This function will be called when the user clicks the button
    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        PopoverContent = "Copied to clipboard!";
    }
</script>

<!-- This button calls the copyTextToClipboard function with the text to copy when clicked -->
<Button 
    id="btn-clipboard-prompt"
    class="bg-purple-700 hover:bg-purple-800 focus:ring-purple-300"
    on:click={() => copyTextToClipboard(textToCopy)}>
    {buttonText}
</Button>
<Popover 
    class="min-w-32 text-sm font-light text-center" 
    title="" 
    triggeredBy="#btn-clipboard-prompt">
    {PopoverContent}
</Popover>
