<script lang="ts">
    import type { User } from "@/lib/firebase/utils/auth/type";

    import Logo from "./Logo.svelte";
    import { Button } from "@/components/base/button";
    import UserDropdown from "@/components/auth/UserDropdown.svelte";

    export let user: User | null | undefined = null;
    export let logoBlack = false;
</script>

<div
    class="my-4 w-full flex justify-center z-30 transition-all"
>
    <div class="mx-5 flex h-16 max-w-screen-xl items-left justify-between w-full">
        <Logo black={logoBlack} />
        <div>
            {#if user}
                <UserDropdown {user} />
            {:else}
                <Button href="/signin" variant="rounded">Sign In</Button>
            {/if}
        </div>
    </div>
</div>
