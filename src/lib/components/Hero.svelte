<script>
	import { getFeaturedProducts } from '$lib/data/products.js';
	import { trustBadges } from '$lib/data/constants.js';
	const showcase = getFeaturedProducts().slice(0, 3);

	const badgeIcons = {
		check: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
		shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
		pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
	};
</script>

<section class="hero">
	<div class="hero-inner container">
		<div class="hero-text">
			<span class="hero-badge">Made in Lebanon</span>
			<h1>Artisanal Lebanese<br/>Delicacies</h1>
			<p>Discover authentic flavors from century-old traditions. Each product is handcrafted with organic ingredients, bringing the taste of Lebanon to your table.</p>
			<div class="hero-actions">
				<a href="/products" class="btn btn-gold">Explore Products</a>
				<a href="/about" class="btn btn-outline">Our Story</a>
			</div>
		</div>

		<div class="hero-images">
			{#each showcase as product, i}
				<a href="/products/{product.slug}" class="hero-img-wrap" style="--delay: {i * 0.15}s">
					<img src={product.image} alt={product.name} />
				</a>
			{/each}
		</div>
	</div>

	<div class="hero-trust">
		<div class="container trust-row">
			{#each trustBadges as badge}
				<span class="trust-item">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">{@html badgeIcons[badge.icon]}</svg>
					{badge.label}
				</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 80px 0 0;
		background: linear-gradient(135deg, var(--color-cream) 0%, var(--color-cream-dark) 100%);
		overflow: hidden;
	}
	.hero-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
		min-height: 480px;
	}
	.hero-badge {
		display: inline-block;
		padding: 6px 16px;
		background: rgba(74,124,89,0.1);
		color: var(--color-success);
		font-size: 0.8rem;
		font-weight: 600;
		border-radius: 999px;
		margin-bottom: 20px;
		letter-spacing: 0.04em;
	}
	h1 {
		font-size: 3.25rem;
		font-weight: 700;
		line-height: 1.12;
		letter-spacing: -0.02em;
		margin-bottom: 20px;
	}
	.hero-text p {
		font-size: 1.1rem;
		line-height: 1.7;
		color: var(--color-text-light);
		margin-bottom: 32px;
		max-width: 480px;
	}
	.hero-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.hero-images {
		display: flex;
		gap: 16px;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 40px;
	}
	.hero-img-wrap {
		width: 160px;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: 0 12px 32px rgba(0,0,0,0.08);
		transition: transform var(--ease);
		animation: fadeUp 0.6s ease both;
		animation-delay: var(--delay);
	}
	.hero-img-wrap:hover {
		transform: translateY(-6px);
	}
	.hero-img-wrap:nth-child(2) {
		margin-top: -40px;
	}
	.hero-img-wrap img {
		width: 100%;
		aspect-ratio: 3/4;
		object-fit: cover;
	}

	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.hero-trust {
		background: var(--color-warm-white);
		padding: 16px 0;
		border-top: 1px solid var(--color-border);
	}
	.trust-row {
		display: flex;
		justify-content: center;
		gap: 40px;
		flex-wrap: wrap;
	}
	.trust-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text-light);
	}

	@media (max-width: 768px) {
		.hero { padding: 48px 0 0; }
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 32px;
			min-height: auto;
			text-align: center;
		}
		h1 { font-size: 2.25rem; }
		.hero-text p { margin: 0 auto 24px; }
		.hero-actions { justify-content: center; }
		.hero-images { gap: 12px; padding-bottom: 24px; }
		.hero-img-wrap { width: 120px; }
		.trust-row { gap: 20px; }
	}
</style>
