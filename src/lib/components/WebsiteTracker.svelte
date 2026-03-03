<!--
  WEBSITE TRACKER
  ================
  Adds the Website Control Panel tracking script to any SvelteKit site.
  The tracker auto-detects the site by matching location.hostname against
  the URL registered in the control panel — no API keys or env vars needed.

  USAGE:
  1. Copy this file to your project: src/lib/components/WebsiteTracker.svelte
  2. Import in your root layout (+layout.svelte):
       import WebsiteTracker from '$lib/components/WebsiteTracker.svelte';
  3. Add <WebsiteTracker /> anywhere in the layout (it only renders into <head>)
  4. Register the site in the control panel (Settings → Add Site with matching URL)

  PROPS:
  - panel: panel URL (default: https://website-control-panel.pages.dev)
-->
<script>
	let { panel = 'https://website-control-panel.pages.dev' } = $props();
</script>

<svelte:head>
	<script src="{panel}/tracker.js"></script>
</svelte:head>
