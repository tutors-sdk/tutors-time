<script lang="ts">
  import type { Course } from "@tutors/tutors-model-lib";
  import LabHeatMapChart from "./HeatMapChart.svelte";
  import type { Session } from "@supabase/supabase-js";

  export let course: Course;
  export let session: Session;
  export let userIds: string[];
  export let userNamesAvatars: Map<string, [string, string]>;
  export let multipleUsers: boolean = true;
</script>

<LabHeatMapChart chartType="LabHeatMap" {course} {session} {userIds} {userNamesAvatars} {multipleUsers} />
