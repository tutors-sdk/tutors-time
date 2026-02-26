<script lang="ts">
  import CalendarGrid from "$lib/components/calendar/CalendarGrid.svelte";
  import type { TutorsTimeCourse } from "$lib/tutors-time-service/types";

  interface Props {
    data: { course: TutorsTimeCourse | null };
  }

  let { data }: Props = $props();
</script>

<CalendarGrid course={data.course} mode="day" />
