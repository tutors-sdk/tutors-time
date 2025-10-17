<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import CourseTitle from "./titles/CourseTitle.svelte";
  import AnonProfile from "./tutors-connect/AnonProfile.svelte";
  import TutorsTitle from "./titles/TutorsTitle.svelte";
  import { currentCourse} from "$lib/runes.svelte";
    import ConnectedProfile from "./tutors-connect/ConnectedProfile.svelte";
</script>

<AppBar>
  <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
    <AppBar.Lead>
    </AppBar.Lead>
    <AppBar.Headline>
      {#if currentCourse?.value}
        <CourseTitle />
      {/if}
    </AppBar.Headline>
    <AppBar.Trail>
      <span class="mx-2 h-10 w-[1px] bg-gray-400 dark:bg-gray-200"></span>
        <!-- <ConnectedProfile /> -->
      <span class="hidden md:block">
      </span>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

