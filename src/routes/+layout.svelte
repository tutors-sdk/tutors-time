<script lang="ts">
  import { tutorsConnectService } from "$lib/services/connect.svelte";
  import "../app.postcss";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
    children: import("svelte").Snippet;
  }
  let { data, children }: Props = $props();

  if (data?.user) {
    tutorsConnectService.reconnect(data.user);
  }
</script>

{@render children()}
