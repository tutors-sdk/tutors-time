<script lang="ts">
  import TutorsShell from "$lib/ui/TutorsShell.svelte";
  import "../../app.postcss";
  import type { PageData } from "./$types";
  interface Props {
    data: PageData;
    children: import("svelte").Snippet;
  }
  let { data, children }: Props = $props();
</script>

<TutorsShell>
  {@render children()}
</TutorsShell>
