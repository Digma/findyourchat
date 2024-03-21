<script lang="ts">
    export let tooltipText: string | undefined = undefined;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(tooltipText || "");
            console.log("Text copied to clipboard");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const openAILink = async () => {
        await copyToClipboard();
        if (!tooltipText) {
            return;
        }
        const encodedText = encodeURIComponent(tooltipText);
        window.open(`https://chat.openai.com/?q=${encodedText}`, "_blank");
    };

    const openGeminiLink = async () => {
        await copyToClipboard();
        window.open("https://gemini.google.com/app", "_blank");
    };

    const openCopilotLink = async () => {
        await copyToClipboard();
        window.open("https://copilot.microsoft.com/", "_blank");
    };

    const openHuggingChatLink = async () => {
        await copyToClipboard();
        window.open("https://huggingface.co/chat", "_blank");
    };
</script>

<div class="group overflow-visible relative py-2">
    <div
        class="absolute min-w-64 invisible top-10 -left-10 group-hover:visible delay-200 bg-white text-black mt-3 text-sm rounded-md m-auto z-200"
    >
        <button class="w-full text-left p-2 hover:bg-gray-200" on:click={openAILink}
            >Copy Prompt & Go to <b>OpenAI</b></button
        >
        <hr class="border-gray-100" />
        <button class="w-full text-left p-2 hover:bg-gray-200" on:click={openGeminiLink}
            >Copy Prompt & Go to <b>Gemini</b></button
        >
        <hr class="border-gray-100" />
        <button class="w-full text-left p-2 hover:bg-gray-200" on:click={openCopilotLink}
            >Copy Prompt & Go to <b>Copilot</b></button
        >
        <hr class="border-gray-100" />
        <button class="w-full text-left p-2 hover:bg-gray-200" on:click={openHuggingChatLink}
            >Copy Prompt & Go to <b>HuggingChat</b></button
        >
        <svg
            class="absolute z-30 top-[-10px] left-20"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8 0L0 10L16 10L8 0Z" fill="white" />
        </svg>
    </div>
    <div class="flex bg-black rounded text-white text-center justify-center py-1 px-2 gap-2">
        <span
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mt-0.5"
                viewBox="0 0 448 512"
                fill="currentColor"
                ><path
                    d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                /></svg
            >
        </span>
        <div class="">Copy Prompt</div>
    </div>
</div>
