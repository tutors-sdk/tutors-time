<script lang="ts">
  import { convertMdToHtml } from "$lib/services/models/markdown-utils";

  import { onMount } from "svelte";
  let contentHtml = "";

  onMount(async () => {
    contentHtml = convertMdToHtml(
      // "An [Open Learning Web Toolkit](/course/tutors-reference-manual): Explore the [Tutors Catalogue](/catalogue)"
      "An [Open Learning Web Toolkit](/course/tutors-reference-manual)"
    );
  });
</script>

{#if contentHtml}
  <div class="flex w-full justify-center">
    <p class="prose prose-sm prose-slate min-w-full dark:prose-invert">
      {@html contentHtml}
    </p>
  </div>
{/if}
