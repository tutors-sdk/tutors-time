<script lang="ts">
  import { popup, type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton";
  import { currentCourse } from "$lib/runes";
  import Icon from "@iconify/svelte";
  import { tutorsConnectService } from "$lib/services/connect.svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { presenceService } from "$lib/services/presence.svelte";

  const drawerStore = getDrawerStore();

  function logout() {
    tutorsConnectService.disconnect("/");
  }

  const onLineDrawerOpen: any = () => {
    const settings: DrawerSettings = { id: "online", position: "right" };
    drawerStore.open(settings);
  };
</script>

<button use:popup={{ event: "click", target: "avatar" }}>
  <div class="btn btn-sm space-x-1">
    <div class="relative inline-block">
      <span class="badge-icon absolute -bottom-2 -right-2 z-10 text-white">
        {#if tutorsConnectService.tutorsId.value?.share}
          <Icon icon="fluent:presence-available-24-filled" color="rgba(var(--color-success-500))" height="20" />
        {:else}
          <Icon icon="fluent:presence-available-24-regular" color="rgba(var(--color-error-500))" height="20" />
        {/if}
      </span>
      <Avatar
        width="w-10"
        src={tutorsConnectService.tutorsId.value?.image}
        alt={tutorsConnectService.tutorsId.value?.name}
      />
    </div>
  </div>
</button>

<nav class="card-body card list-nav w-56 space-y-4 p-4 shadow-lg" data-popup="avatar">
  <span class="ml-4 mt-2 text-xs">Logged in as:</span><br />
  <span class="ml-4 text-sm">{tutorsConnectService.tutorsId.value?.name}</span>
  <ul>
    <li>
      <a href="/dashboard">
        <Icon icon="fluent:home-24-filled" color="rgba(var(--color-primary-500))" height="20" />
        <div class="ml-2">Dashboard</div>
      </a>
    </li>
    <hr />
    {#if tutorsConnectService.tutorsId.value?.share}
      <li>
        <a href="https://live.tutors.dev/{currentCourse.value?.courseId}" target="_blank" rel="noreferrer">
          <Icon icon="fluent:people-list-24-filled" color="rgba(var(--color-primary-500))" height="20" />
          <div class="ml-2">Tutors Live</div>
        </a>
      </li>
      <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a onclick={onLineDrawerOpen}>
          <Icon icon="fluent:people-list-24-filled" color="rgba(var(--color-primary-500))" height="20" />
          <div class="ml-2">
            View <span class="badge bg-error-500 text-white">{presenceService.studentsOnline.value.length}</span> Online
          </div>
        </a>
      </li>
      <hr />
    {/if}
    <li>
      <a href="https://github.com/{tutorsConnectService.tutorsId.value?.login}" target="_blank" rel="noreferrer">
        <Icon icon="mdi:github" height="20" />
        <div class="ml-2">Github Profile</div>
      </a>
    </li>
    <li>
      <button onclick={logout} class="w-full">
        <Icon icon="fluent:sign-out-24-filled" color="rgba(var(--color-error-500))" height="20" />
        <div class="ml-2">Disconnect</div>
      </button>
    </li>
  </ul>
</nav>
