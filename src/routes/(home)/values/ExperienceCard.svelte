<script lang="ts">
  import { convertMdToHtml } from "$lib/services/models/markdown-utils";
  interface Props {
    link?: string;
    title?: string;
    content?: string;
  }

  let { link = "", title = "", content = "" }: Props = $props();
  let contentHtml = convertMdToHtml(content);
</script>

<a href={link} target="_blank" rel="noreferrer">
  <div class="transition-al card mx-auto my-4 w-80 border-y-8 border-primary-500 hover:scale-105 lg:m-4">
    <div class="card-header">
      <h3 class="card-title text-2xl font-bold">{title}</h3>
    </div>
    <div class="card-body m-4">
      <p class="card-text">
        {@html contentHtml}
      </p>
    </div>
  </div>
</a>
