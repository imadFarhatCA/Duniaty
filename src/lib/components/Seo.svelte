<script>
	import { SITE_URL, SITE_NAME } from '$lib/data/constants.js';

	let {
		title,
		description,
		path = '/',
		image = `${SITE_URL}/og-image.jpg`,
		type = 'website',
		noindex = false,
		jsonLd = null
	} = $props();

	let canonical = $derived(SITE_URL + path);
	let jsonLdTag = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if jsonLdTag}
		{@html jsonLdTag}
	{/if}
</svelte:head>
