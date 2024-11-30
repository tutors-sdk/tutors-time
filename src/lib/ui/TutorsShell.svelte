<script lang="ts">
  import Footer from "$lib/ui/navigators/footers/Footer.svelte";
  import type { Snippet } from "svelte";
  import MainNavigator from "./navigators/MainNavigator.svelte";

  type Props = { children: Snippet };
  let { children }: Props = $props();
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
  <header class="ackdrop-blur-sm sticky top-0 bg-surface-100 dark:bg-surface-950">
    <MainNavigator />
  </header>
  <main class="mt-2 overflow-y-auto">
    {@render children()}
  </main>
  <footer class="hidden lg:block">
    <Footer />
  </footer>
</div>
