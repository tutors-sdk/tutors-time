<script lang="ts">
  import type { PageData } from "./$types";
  import Context from "$lib/ui/learning-objects/structure/Context.svelte";
  import Talk from "$lib/ui/learning-objects/content/Talk.svelte";

  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();
</script>

<Context lo={data.lo}>
  <Talk lo={data.lo} />
</Context>
