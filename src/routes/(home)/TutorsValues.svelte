<script lang="ts">
  import DeveloperExperience from "./values/DeveloperExperience.svelte";
  import LearnerExperience from "./values/LearnerExperience.svelte";
  import EducatorExperience from "./values/EducatorExperience.svelte";
</script>

<div class="container mx-auto items-center justify-center py-5">
  <div class="m-4 w-full">
    <h2 class="inline-block !text-5xl font-bold">
      The <span
        class="inline-block bg-gradient-to-br from-primary-500 to-secondary-500 box-decoration-clone bg-clip-text !text-5xl font-bold text-transparent"
        >Values</span
      > of the project
    </h2>
  </div>
  <div class="my-12 w-full justify-center lg:flex">
    <LearnerExperience />
    <EducatorExperience />
    <DeveloperExperience />
  </div>
</div>
