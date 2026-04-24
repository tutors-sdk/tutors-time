<script lang="ts">
  import { getSupabase } from "@tutors/tutors-time-lib";
  import { onMount } from "svelte";

  let { courseId, studentId }: { courseId: string; studentId: string } = $props();

  interface AssignmentRow {
    id: number;
    name: string | null;
    url: string | null;
    due_date: string | null;
    submittedAt: string | null;
    status: string | null;
  }

  let rows = $state<AssignmentRow[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let noMapping = $state(false);

  onMount(async () => {
    const cid = courseId.trim();
    const sid = studentId.trim();
    if (!cid || !sid) {
      error = "Course ID and Student ID are required.";
      loading = false;
      return;
    }
    try {
      const supabase = getSupabase();

      const { data: mappingRows, error: mappingError } = await supabase
        .from("tutors-connect_moodle")
        .select("moodle_id")
        .eq("github_id", sid);

      if (mappingError) throw new Error(mappingError.message);

      const moodleId = (mappingRows ?? [])[0]?.moodle_id as number | undefined;
      if (moodleId === undefined) {
        noMapping = true;
        loading = false;
        return;
      }

      const { data: assignments, error: assignmentsError } = await supabase
        .from("assignments")
        .select("id, name, url, due_date")
        .eq("courseid", cid);

      if (assignmentsError) throw new Error(assignmentsError.message);

      const assignmentIds = (assignments ?? []).map((a) => a.id as number);

      const latestByAssignment = new Map<number, { submittedAt: string | null; status: string | null }>();
      if (assignmentIds.length > 0) {
        const { data: submissions, error: submissionsError } = await supabase
          .from("assignments_submissions")
          .select("assignmentId, status, timemodified, timecreated")
          .in("assignmentId", assignmentIds)
          .eq("external_userid", moodleId);

        if (submissionsError) throw new Error(submissionsError.message);

        for (const s of submissions ?? []) {
          const row = s as {
            assignmentId: number;
            status: string | null;
            timemodified: string | null;
            timecreated: string | null;
          };
          const submittedAt = row.timemodified ?? row.timecreated ?? null;
          const current = latestByAssignment.get(row.assignmentId);
          const currentTime = current?.submittedAt ? new Date(current.submittedAt).getTime() : -Infinity;
          const nextTime = submittedAt ? new Date(submittedAt).getTime() : -Infinity;
          if (!current || nextTime > currentTime) {
            latestByAssignment.set(row.assignmentId, { submittedAt, status: row.status ?? null });
          }
        }
      }

      rows = (assignments ?? []).map((a) => {
        const id = a.id as number;
        const sub = latestByAssignment.get(id);
        return {
          id,
          name: (a as { name: string | null }).name,
          url: (a as { url: string | null }).url,
          due_date: (a as { due_date: string | null }).due_date,
          submittedAt: sub?.submittedAt ?? null,
          status: sub?.status ?? null
        };
      });
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to load assignments";
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString: string | null): string {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateString;
    }
  }

  function submittedColor(submittedAt: string | null, dueDate: string | null): string {
    if (!submittedAt || !dueDate) return "";
    const submitted = new Date(submittedAt).getTime();
    const due = new Date(dueDate).getTime();
    if (Number.isNaN(submitted) || Number.isNaN(due)) return "";
    return submitted <= due ? "background-color: rgb(183, 243, 183)" : "background-color: rgb(180, 0, 0); color: white";
  }
</script>

{#if loading}
  <div class="flex items-center justify-center p-8">
    <p class="text-lg">Loading assignments...</p>
  </div>
{:else if error}
  <div class="card preset-filled-error-500 p-4">
    <p class="font-bold">Error loading data</p>
    <p class="text-sm">{error}</p>
  </div>
{:else if noMapping}
  <div class="flex items-center justify-center p-8">
    <p class="text-lg text-surface-600">No Moodle mapping for this student</p>
  </div>
{:else if rows.length === 0}
  <div class="flex items-center justify-center p-8">
    <p class="text-lg text-surface-600">No assignments available</p>
  </div>
{:else}
  <section class="card p-6">
    <h2 class="text-2xl font-semibold mb-4">Assignment Activity</h2>
      <div class="overflow-x-auto">
      <table class="table">
      <thead>
        <tr>
          <th>Assignment</th>
          <th>Due Date</th>
          <th>Submitted At</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.id)}
          <tr>
            <td>
              {#if row.url}
                <a class="anchor" href={row.url} target="_blank" rel="noopener noreferrer">
                  {row.name ?? row.id}
                </a>
              {:else}
                {row.name ?? row.id}
              {/if}
            </td>
            <td>{formatDate(row.due_date)}</td>
            <td style={submittedColor(row.submittedAt, row.due_date)}>
              {formatDate(row.submittedAt)}
            </td>
            <td>{row.status ?? "-"}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  </section>
  <p class="mt-4 text-sm text-surface-600">
    Showing {rows.length} {rows.length === 1 ? "assignment" : "assignments"}
  </p>
{/if}
