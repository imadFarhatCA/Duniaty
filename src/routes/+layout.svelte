<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import WebsiteTracker from '$lib/components/WebsiteTracker.svelte';

	let { children } = $props();
	let cartOpen = $state(false);
</script>

<svelte:head>
	<title>Duniaty by Dunia | Artisanal Lebanese Delicacies</title>
	<meta name="description" content="Discover authentic artisanal Lebanese food products — olive oil, jams, honey, makdous, and more. Fresh organic products made in Lebanon." />
</svelte:head>
<WebsiteTracker />

<Navbar onCartClick={() => cartOpen = true} />
<main>
	{@render children()}
</main>
<Footer />
<CartDrawer bind:open={cartOpen} />
