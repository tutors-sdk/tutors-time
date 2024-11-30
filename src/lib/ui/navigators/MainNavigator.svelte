<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import CourseTitle from "./titles/CourseTitle.svelte";
  import { currentCourse } from "$lib/runes";
  import LayoutMenu from "../themes/LayoutMenu.svelte";
  import { tutorsConnectService } from "$lib/services/connect.svelte";
  import AnonProfile from "./tutors-connect/AnonProfile.svelte";
  import ConnectedProfile from "./tutors-connect/ConnectedProfile.svelte";
  import TutorsTitle from "./titles/TutorsTitle.svelte";
</script>

<AppBar
  padding="p-2"
  spaceY=""
  toolbarClasses="flex items-center"
  leadClasses="flex items-center"
  trailClasses="flex items-center"
>
  {#snippet lead()}
    {#if currentCourse?.value}
      <CourseTitle />
    {:else}
      <span class="ml-12">
        <TutorsTitle title="Tutors Open Source Project" subtitle="Open Web Learning Components" />
      </span>
    {/if}
  {/snippet}
  {#snippet trail()}
    <span class="mx-2 h-10 w-[1px] bg-gray-400 dark:bg-gray-200"></span>
    <LayoutMenu />
    <span class="mx-2 h-10 w-[1px] bg-gray-400 dark:bg-gray-200"></span>
    {#if !currentCourse?.value?.isPrivate}
      <div class="relative">
        {#if !tutorsConnectService.tutorsId.value?.login}
          <AnonProfile redirect="/{currentCourse?.value?.courseId}" />
        {:else}
          <ConnectedProfile />
        {/if}
      </div>
    {/if}
  {/snippet}
</AppBar>
