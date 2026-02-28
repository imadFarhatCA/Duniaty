<script>
	import ProductCard from './ProductCard.svelte';
	import { getFeaturedProducts } from '$lib/data/products.js';

	const featured = getFeaturedProducts();
</script>

<section class="section">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Our Finest Selection</h2>
				<p class="section-subtitle">Handpicked artisanal products crafted with generations of Lebanese tradition.</p>
			</div>
			<a href="/products" class="btn btn-outline">View All</a>
		</div>

		<div class="grid">
			{#each featured as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<style>
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 40px;
		gap: 24px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}

	@media (max-width: 1024px) {
		.grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 640px) {
		.section-header { flex-direction: column; align-items: flex-start; }
		.grid { grid-template-columns: 1fr 1fr; gap: 16px; }
	}
</style>
