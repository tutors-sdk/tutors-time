<script lang="ts">
  import "../app.css";
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { initializeStores, storePopup } from "@skeletonlabs/skeleton";
  let { children } = $props();

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

{@render children()}
