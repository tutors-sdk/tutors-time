<script lang="ts">
  import { currentCourse } from "$lib/runes";
  import { tutorsConnectService } from "$lib/services/connect.svelte";
  import MenuItem from "../../utils/MenuItem.svelte";
  import Icon from "$lib/ui/themes/icons/Icon.svelte";
  import Menu from "$lib/ui/utils/Menu.svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte";
  function logout() {
    tutorsConnectService.disconnect("/");
  }
</script>

{#snippet menuSelector()}
  <div class="relative">
    <div class="mt-2 flex items-center">
      <Avatar
        classes="size-9"
        src={tutorsConnectService.tutorsId.value?.image}
        name={tutorsConnectService.tutorsId.value?.name}
      />
    </div>
  </div>
{/snippet}

{#snippet menuContent()}
  <ul class="space-y-3">
    <MenuItem link="/" text="Home" type="tutors" />
    <hr />
    {#if tutorsConnectService.tutorsId.value?.share === "true"}
      <MenuItem
        link="https://live.tutors.dev/course/{currentCourse.value?.courseId}"
        text="Tutors Live"
        type="live"
        targetStr="_blank"
      />
      <hr />
    {/if}
    <MenuItem
      link="https://github.com/{tutorsConnectService.tutorsId.value?.login}"
      text="Github Profile"
      type="github"
      targetStr="_blank"
    />
    <MenuItem text="Disconnect" type="logout" onClick={logout} />
  </ul>
{/snippet}

<Menu {menuSelector} {menuContent} />
