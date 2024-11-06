<script lang="ts">
  import { currentCourse } from "$lib/runes";
  import Icon from "$lib/ui/themes/icons/Icon.svelte";
</script>

<a class="btn btn-sm" href="/search/{currentCourse?.value?.courseUrl}">
  <span class="text-sm font-bold inline-flex gap-2">
    <Icon type="search" />
    <span class="hidden lg:block"> Search</span>
  </span>
</a>
