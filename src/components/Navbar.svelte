<script lang="ts">
  import { userRecord } from "../lib/store";

  import Logo from "./Logo.svelte";
  import { Button } from "@/components/base/button";
  import UserDropdown from "@/components/auth/UserDropdown.svelte";

  export let logoBlack = false;
  export let hideUser = false;
  $: textColor = logoBlack ? "text-black" : "text-white";

  // Load user from store
  $: user = $userRecord;

  let isOpen = false;
</script>

<div class="my-4 w-full flex justify-center z-30 transition-all mb-12 sm:mb-2">
  <div
    class="mx-5 flex flex-col sm:flex-row h-16 max-w-screen-xl items-left justify-between w-full"
  >
    <Logo black={logoBlack} />
    <div class="flex flex-row align-middle justify-between">
      <div class="py-2 px-2 sm:px-6 mr-2">
        <div class="relative flex gap-4">
          <a href="/methodology/overview" class="text-xl {textColor}">
            Methodology
          </a>
          <p class="text-xl font-light {textColor} text-opacity-20">|</p>
          <button
            class="text-xl font-light {textColor} rounded inline-flex relative gap-x-2"
            on:click={() => (isOpen = !isOpen)}
          >
            Docs
            <svg
              class="hs-dropdown-open:rotate-180 size-4 mt-1.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
            >
          </button>
          {#if isOpen}
            <div class="absolute z-10 right-0 mt-2 min-w-36">
              <div
                class="bg-white border-gray-200 rounded-md shadow-lg will-change-transform animate-slide-up-fade"
              >
                <div class="text-sm py-1">
                  <a
                    href="/doc/chatgpt-guide"
                    class="w-full block inline-flex gap-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    ChatGPT
                  </a>
                  <a
                    href="/doc/huggingchat-guide"
                    class="w-full block inline-flex gap-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    HuggingChat
                  </a>
                  <a
                    href="/doc/google-gemini-guide"
                    class="w-full block inline-flex gap-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Google Gemini
                  </a>
                  <a
                    href="/doc/microsoft-copilot-guide"
                    class="w-full block inline-flex gap-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-black"
                  >
                    Microsoft Copilot
                  </a>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
      <div class="mt-1">
        {#if !hideUser}
          {#if user}
            <UserDropdown {user} />
          {:else}
            <Button href="/signin" variant="rounded">Sign In</Button>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
