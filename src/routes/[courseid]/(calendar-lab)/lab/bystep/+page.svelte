<script lang="ts">
  import LabsGrid from "$lib/components/labs/LabsGrid.svelte";
  import type { TutorsTimeCourse } from "$lib/tutors-time-service/types";

  interface Props {
    data: { course: TutorsTimeCourse | null };
  }

  let { data }: Props = $props();
</script>

<LabsGrid course={data.course} mode="step" />
