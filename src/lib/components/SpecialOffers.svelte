<script>
	import ProductCard from './ProductCard.svelte';
	import { getProductsWithOffers } from '$lib/data/products.js';

	const offers = getProductsWithOffers();
</script>

<section class="offers-section">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Special Offers</h2>
				<p class="section-subtitle">Limited-time deals on our most loved products.</p>
			</div>
		</div>

		<div class="grid">
			{#each offers as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<style>
	.offers-section {
		padding: 80px 0;
		background: var(--color-cream-dark);
	}
	.section-header {
		margin-bottom: 40px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	@media (max-width: 1024px) {
		.grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 640px) {
		.offers-section { padding: 48px 0; }
		.grid { grid-template-columns: 1fr; }
	}
</style>
