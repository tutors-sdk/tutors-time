<script lang="ts">
  import { tutorsConnectService } from "$lib/services/connect.svelte";
  import Links from "$lib/ui/navigators/Links.svelte";
</script>

<div class="to-accent-50 dark:to-accent-900 bg-gradient-to-l from-primary-50 dark:from-primary-900">
  <div class="container mx-auto justify-between px-8 py-20 lg:flex">
    <div class="">
      <p class="text-3xl font-bold">
        Welcome, {tutorsConnectService.tutorsId.value?.name}!
      </p>
    </div>
    <div>
      <Links />
    </div>
  </div>
</div>
