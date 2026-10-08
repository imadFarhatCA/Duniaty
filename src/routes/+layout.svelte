<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import CartReminder from '$lib/components/CartReminder.svelte';
	import WebsiteTracker from '$lib/components/WebsiteTracker.svelte';
	import { SITE_URL, SITE_NAME, INSTAGRAM_URL, CONTACT_PHONE } from '$lib/data/constants.js';

	let { children } = $props();
	let cartOpen = $state(false);

	const orgJsonLd = `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'OnlineStore',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				alternateName: 'Duniaty',
				url: SITE_URL,
				logo: `${SITE_URL}/logo.png`,
				description: 'Artisanal Lebanese delicacies: zaatar (Lebanese thyme), oak honey, mixed spices, olive oil, jams, makdous and keshek. Fresh organic products made in Lebanon, delivered everywhere in Lebanon.',
				sameAs: [INSTAGRAM_URL],
				telephone: CONTACT_PHONE,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Beirut',
					addressCountry: 'LB'
				}
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: SITE_URL,
				publisher: { '@id': `${SITE_URL}/#organization` }
			}
		]
	})}<\/script>`;
</script>

<svelte:head>
	{@html orgJsonLd}
</svelte:head>
<WebsiteTracker />

<Navbar onCartClick={() => cartOpen = true} />
<main>
	{@render children()}
</main>
<Footer />
<CartDrawer bind:open={cartOpen} />
<CartReminder />
