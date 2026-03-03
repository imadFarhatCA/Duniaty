<script>
	import { values } from '$lib/data/constants.js';

	const valueIcons = {
		shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
		heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
		globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>'
	};
</script>

<svelte:head>
	<title>About | Duniaty by Dunia</title>
</svelte:head>

<section class="about section">
	<div class="container">
		<div class="about-header">
			<h1>Our Story</h1>
			<p class="lead">From the heart of Lebanon to your table — a journey of flavor, tradition, and love.</p>
		</div>

		<div class="about-grid">
			<div class="about-text">
				<h2>Rooted in Tradition</h2>
				<p>Duniaty was born from a deep love for Lebanese cuisine and a desire to share its authentic flavors with the world. Every product in our collection is crafted using time-honored recipes passed down through generations of Lebanese artisans.</p>
				<p>From the cold-pressed olive oils of Northern Lebanon to the sun-ripened strawberry jams of the Bekaa Valley, each jar and bottle tells a story of craftsmanship, patience, and pride.</p>

				<h2>Our Promise</h2>
				<p>We believe in transparency, quality, and sustainability. All our products are made from 100% organic ingredients, BIO certified, and free from artificial preservatives. When you choose Duniaty, you're choosing real food made by real people.</p>
			</div>

			<div class="about-images">
				<img src="/products/olive-oil.jpg" alt="Lebanese Olive Oil" class="about-img" />
				<img src="/products/oak-honey.jpg" alt="Oak Honey" class="about-img" />
			</div>
		</div>

		<div class="values-grid">
			{#each values as val}
				<div class="value-card">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.5">{@html valueIcons[val.icon]}</svg>
					<h3>{val.title}</h3>
					<p>{val.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.about-header {
		text-align: center;
		margin-bottom: 60px;
	}
	.about-header h1 {
		font-size: 2.75rem;
		font-weight: 700;
		margin-bottom: 12px;
	}
	.lead {
		font-size: 1.15rem;
		color: var(--color-text-light);
		max-width: 600px;
		margin: 0 auto;
	}
	.about-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 48px;
		align-items: flex-start;
		margin-bottom: 80px;
	}
	.about-text h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 12px;
		margin-top: 32px;
	}
	.about-text h2:first-child { margin-top: 0; }
	.about-text p {
		font-size: 1rem;
		line-height: 1.75;
		color: var(--color-text-light);
		margin-bottom: 16px;
	}
	.about-images {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.about-img {
		border-radius: var(--radius-lg);
		aspect-ratio: 4/3;
		object-fit: cover;
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
	}
	.values-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.value-card {
		text-align: center;
		padding: 32px 24px;
		background: var(--color-warm-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}
	.value-card h3 {
		font-size: 1.1rem;
		margin: 16px 0 8px;
	}
	.value-card p {
		font-size: 0.9rem;
		color: var(--color-text-light);
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.about-header h1 { font-size: 2rem; }
		.about-grid { grid-template-columns: 1fr; }
		.about-images { order: -1; }
		.values-grid { grid-template-columns: 1fr; }
	}
</style>
