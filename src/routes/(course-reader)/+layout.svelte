<script lang="ts">
  import "../../app.css";
  import { currentCourse, currentLo } from "$lib/runes";
  import CourseShell from "$lib/ui/app-shells/CourseShell.svelte";
  import type { Snippet } from "svelte";
  import { tutorsConnectService } from "$lib/services/connect.svelte";

  type Props = { children: Snippet };
  let { children }: Props = $props();

  let lastCourseId = "";
  $effect(() => {
    if (currentCourse.value?.courseId !== lastCourseId) {
      tutorsConnectService.courseVisit(currentCourse?.value!, tutorsConnectService?.tutorsId.value);
      lastCourseId = currentCourse?.value?.courseId!;
    }
  });
</script>

<svelte:head>
  <title>{currentLo?.value?.title}</title>
</svelte:head>

<CourseShell>
  {@render children()}
</CourseShell>
