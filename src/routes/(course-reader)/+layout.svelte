<script lang="ts">
  import "../../app.css";
  import { currentLo } from "$lib/runes";
  import CourseShell from "$lib/ui/app-shells/CourseShell.svelte";
  import type { Snippet } from "svelte";

  type Props = { children: Snippet };
  let { children }: Props = $props();
</script>

<svelte:head>
  <title>{currentLo?.value?.title}</title>
</svelte:head>

<CourseShell>
  {@render children()}
</CourseShell>
