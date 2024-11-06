<script lang="ts">
  import type { Lo } from "$lib/services/models/lo-types";
  import type { Snippet } from "svelte";
  import LoContextPanel from "../layout/LoContextPanel.svelte";

  type Props = {
    children: Snippet;
    lo: Lo;
  };
  let { children, lo }: Props = $props();

  let loContext = lo;
  if (loContext) {
    while (loContext.type !== "topic" && loContext.type !== "course") {
      loContext = loContext.parentLo!;
    }
  }
</script>

<div class="flex justify-between ml-10 mr-10">
  <div class="w-full">
    {@render children()}
  </div>
  {#if loContext}
    <div class="hidden xl:block h-auto w-72 mr-2">
      <div class="sticky h-auto top-6">
        <LoContextPanel {loContext} />
      </div>
    </div>
  {/if}
</div>
