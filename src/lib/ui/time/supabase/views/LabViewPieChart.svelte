<script lang="ts">
  import type { Course } from "@tutors/tutors-model-lib";
  import type { Session } from "@supabase/supabase-js";
  import Chart from './Chart.svelte';

  export let course: Course;
  export let session: Session;
</script>

<Chart chartType="LabPieChart" {course} {session} />