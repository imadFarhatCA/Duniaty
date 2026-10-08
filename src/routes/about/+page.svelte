<script>
	import { values } from '$lib/data/constants.js';
	import Seo from '$lib/components/Seo.svelte';

	const valueIcons = {
		shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
		heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
		globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>'
	};
</script>

<Seo
	title="Our Story | Duniaty by Dunia"
	description="Duniaty was founded by Dunia Tarraf Akiki to bring ecologically clean, healthy and delicious Lebanese foods to your table — artisanal zaatar, honey and spices from the mountains of Lebanon."
	path="/about"
/>

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

		<div class="founder">
			<span class="founder-eyebrow">Our Founder</span>
			<blockquote>
				&ldquo;Inspired by the love of nature and natural ecological products, I launched Duniaty to benefit people by providing them with natural, traditional goods. My mission is making sure that the people who buy my products enjoy ecologically clean and healthy foods &mdash; and healthy does not have to mean tasteless. I have made sure our products are delicious and satisfying to the taste buds.&rdquo;
			</blockquote>
			<div class="founder-sig">
				<span class="founder-name">Dunia Tarraf Akiki</span>
				<span class="founder-role">Founder of Duniaty</span>
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

		<div class="gallery">
			<div class="gallery-header">
				<h2>Moments from Duniaty</h2>
				<p>&ldquo;Every drop of olive oil, every grain of zaatar tells a story &mdash; a story of land, family, and tradition.&rdquo;</p>
			</div>
			<div class="gallery-grid">
				<img src="/gallery/spice-range.jpg" alt="Four Duniaty spice blends held up together" loading="lazy" />
				<img src="/gallery/gift-duo.jpg" alt="Duniaty zaatar and a gift-wrapped olive oil bottle" loading="lazy" />
				<img src="/gallery/fish-your-dish-hands.jpg" alt="The Fish Your Dish spice mix" loading="lazy" />
				<img src="/gallery/shopping-bag.jpg" alt="The Duniaty shopping bag" loading="lazy" />
			</div>
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

	.founder {
		background: var(--color-navy);
		border-radius: var(--radius-lg);
		padding: 56px 48px;
		text-align: center;
		margin-bottom: 80px;
	}
	.founder-eyebrow {
		color: var(--color-gold);
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}
	.founder blockquote {
		color: rgba(255,255,255,0.92);
		font-size: 1.15rem;
		line-height: 1.8;
		font-style: italic;
		max-width: 720px;
		margin: 20px auto 28px;
	}
	.founder-sig { display: flex; flex-direction: column; gap: 2px; }
	.founder-name {
		color: var(--color-gold);
		font-weight: 600;
		font-size: 1.05rem;
	}
	.founder-role {
		color: rgba(255,255,255,0.6);
		font-size: 0.85rem;
	}

	.gallery { margin-top: 80px; }
	.gallery-header {
		text-align: center;
		margin-bottom: 36px;
	}
	.gallery-header h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 10px;
	}
	.gallery-header p {
		color: var(--color-text-light);
		font-style: italic;
		max-width: 560px;
		margin: 0 auto;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
	.gallery-grid img {
		width: 100%;
		display: block;
		aspect-ratio: 3/4;
		object-fit: cover;
		border-radius: var(--radius-lg);
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
	}

	@media (max-width: 768px) {
		.about-header h1 { font-size: 2rem; }
		.about-grid { grid-template-columns: 1fr; }
		.about-images { order: -1; }
		.values-grid { grid-template-columns: 1fr; }
		.founder { padding: 40px 24px; }
		.founder blockquote { font-size: 1rem; }
		.gallery-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
	}
</style>
