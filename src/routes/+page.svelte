<script lang="ts">
  import CourseIdDialog from "$lib/components/CourseIdDialog.svelte";
  import { TutorsTime } from "$lib/tutors-time-service";
  import { goto } from "$app/navigation";

  let dialogOpen = $state(true);
  let dialogLoading = $state(false);
  let dialogError = $state<string | null>(null);
  let courseIdForDialog = $state<string | null>(null);

  async function handleLoadCourse(courseId: string, startDate: string | null, endDate: string | null) {
    dialogError = null;
    dialogLoading = true;
    try {
      await TutorsTime.loadCourseTime(courseId, startDate, endDate);
      dialogOpen = false;
      goto(`/${courseId}/medians`);
    } catch (e) {
      dialogError = e instanceof Error ? e.message : "Failed to load calendar data";
    } finally {
      dialogLoading = false;
    }
  }

  function handleCourseIdSubmit(
    event: CustomEvent<{ courseId: string; startDate: string | null; endDate: string | null }>
  ) {
    handleLoadCourse(event.detail.courseId, event.detail.startDate, event.detail.endDate);
  }

  function handleDialogClose() {
    dialogOpen = true;
  }

  function handleDialogOpen(event: CustomEvent<{ open: boolean }>) {
    dialogOpen = event.detail.open;
  }
</script>

<svelte:head>
  <title>Tutors Time</title>
  <meta name="description" content="Calendar visualization for student course time tracking" />
</svelte:head>

<CourseIdDialog
  open={dialogOpen}
  courseId={courseIdForDialog}
  loading={dialogLoading}
  error={dialogError}
  on:submit={handleCourseIdSubmit}
  on:close={handleDialogClose}
  on:open={handleDialogOpen}
/>

<section class="p-2 h-[calc(100vh-4rem)] flex items-center justify-center">
  <p class="text-surface-600">Enter a course ID to load calendar data</p>
</section>
