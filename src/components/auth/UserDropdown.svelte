<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";

  import { Popover } from "@/components/base/popover";
  import DashboardIcon from "../icons/DashboardIcon.svelte";
  import LogoutIcon from "../icons/LogoutIcon.svelte";
  import { Button } from "@/components/base/button";
  import type { User } from "@/lib/firebase/utils/auth/type";
  import { userRecord } from "@/lib/store";

  export let user: User;
  $: initials = user?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 3)
    .join("");

  const emptyUserRecordStore = () => {
    userRecord.set(undefined);
  };
</script>

{#if user?.email}
  <Popover>
    <button
      slot="trigger"
      let:bindTrigger
      use:bindTrigger
      class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none focus:ring-0 active:scale-95 sm:h-9 sm:w-9"
    >
      {#if user?.photoURL}
        <img alt="User Icon" width="40" height="40" src={user?.photoURL} />
      {:else}
        <Avatar class="self-center" {initials} background="bg-gray-300" />
      {/if}
    </button>
    <div slot="content">
      <div class="p-2">
        {#if user?.displayName}
          <p class="truncate text-sm font-medium text-gray-900">
            {user?.displayName}
          </p>
        {/if}
        <p class="truncate text-sm text-gray-500">
          {user?.email}
        </p>
      </div>
      <Button href="/profile" variant="ghost">
        <DashboardIcon />
        <p class="text-sm">Profile</p>
      </Button>

      <form action="/api/auth/signout" on:submit={emptyUserRecordStore}>
        <Button type="submit" variant="ghost">
          <LogoutIcon />
          <p class="text-sm">Sign out</p>
        </Button>
      </form>
    </div>
  </Popover>
{/if}
