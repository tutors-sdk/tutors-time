<script lang="ts">
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import Links from "$lib/ui/navigators/Links.svelte";
</script>

<div class="to-accent-50 dark:to-accent-900 bg-gradient-to-l from-primary-50 dark:from-primary-900">
  <div class="container mx-auto items-center justify-center py-32 lg:flex">
    <div class="mx-4 lg:w-1/2">
      <h1 class="my-4 inline-block !text-5xl font-bold">
        An
        <span
          class="inline-block bg-gradient-to-br from-primary-500 to-secondary-500 box-decoration-clone bg-clip-text !text-5xl font-bold text-transparent"
          >Open Learning
        </span>
        Web Toolkit
      </h1>
      <p class="my-4 py-4 !text-lg">
        A collection of open source components & services supporting the creation of transformative learning experiences
        using open web standards. Developed to support the <a
          class="font-bold underline"
          href="/course/wit-hdip-comp-sci-showcase.netlify.app"
        >
          Higher Diploma in Computer Science
        </a>
        at <a class="font-bold underline" href="https://www.setu.ie">SETU</a>
      </p>
      <Links />
    </div>
    <div class="w-full lg:w-1/2">
      <img src={$modeCurrent ? "/tutors-reader-light.png" : "/tutors-reader-dark.png"} alt="tutors reader screenshot" />
    </div>
  </div>
</div>
