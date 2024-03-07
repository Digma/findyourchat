<script lang="ts">
    export let black = false;
    $: colorDefault = black ? "text-black" : "text-white";
</script>

<a href="/">
    <div class="text-black font-bold text-2xl inline-flex items-center">
        <img
            src="/logo.svg"
            alt="FindYourChat.ai logo"
            width="40"
            height="40"
            class="mr-2 rounded-sm"
        />
        <span class="text-lightblue-accent ml-1">Find</span>
        <span class="{colorDefault} italic">Your<em/></span>
        <span class="text-yellow-accent ml-1.5">Chat</span>
        <span class="text-yellow-accent">.</span>
        <span class="text-dark">ai</span>
    </div>
</a>
