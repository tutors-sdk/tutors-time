<script lang="ts">
  import "../../app.css";
  import TutorsLinks from "./TutorsLinks.svelte";
  import TutorsValues from "./TutorsValues.svelte";
  import TutorsCredits from "./TutorsCredits.svelte";
  import HomeFooter from "$lib/ui/navigators/footers/HomeFooter.svelte";
  import TutorsShell from "$lib/ui/app-shells/TutorsShell.svelte";
</script>

<TutorsShell>
  <TutorsLinks />
  <TutorsValues />
  <TutorsCredits />
  <HomeFooter />
</TutorsShell>
