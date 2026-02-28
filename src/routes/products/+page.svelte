<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { products, categories, getProductsByCategory } from '$lib/data/products.js';

	let selectedCategory = $state('All');
	let sortBy = $state('default');

	let filtered = $derived.by(() => {
		let list = getProductsByCategory(selectedCategory);
		if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
		if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});
</script>

<svelte:head>
	<title>Products | Duniaty by Dunia</title>
</svelte:head>

<section class="products-page section">
	<div class="container">
		<div class="page-header">
			<h1 class="page-title">Our Products</h1>
			<p class="page-subtitle">Authentic Lebanese delicacies, handcrafted with organic ingredients.</p>
		</div>

		<div class="filters">
			<div class="category-pills">
				{#each categories as cat}
					<button
						class="pill"
						class:active={selectedCategory === cat}
						onclick={() => selectedCategory = cat}
					>{cat}</button>
				{/each}
			</div>

			<select class="sort-select" bind:value={sortBy}>
				<option value="default">Sort by</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
				<option value="rating">Top Rated</option>
				<option value="name">Name A–Z</option>
			</select>
		</div>

		<div class="product-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</div>

		<div class="grid">
			{#each filtered as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<style>
	.page-header {
		margin-bottom: 32px;
	}
	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 8px;
	}
	.page-subtitle {
		font-size: 1.05rem;
		color: var(--color-text-light);
	}
	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
		flex-wrap: wrap;
	}
	.category-pills {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.pill {
		padding: 8px 18px;
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-warm-white);
		color: var(--color-text-light);
		cursor: pointer;
		transition: all var(--ease);
	}
	.pill:hover {
		border-color: var(--color-navy);
		color: var(--color-navy);
	}
	.pill.active {
		background: var(--color-navy);
		color: var(--color-gold);
		border-color: var(--color-navy);
	}
	.sort-select {
		padding: 8px 16px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-warm-white);
		font-size: 0.85rem;
		color: var(--color-text);
		cursor: pointer;
	}
	.product-count {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin-bottom: 24px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}

	@media (max-width: 1024px) {
		.grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (max-width: 768px) {
		.page-title { font-size: 2rem; }
		.grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
		.filters { flex-direction: column; align-items: flex-start; }
	}
	@media (max-width: 480px) {
		.grid { grid-template-columns: 1fr 1fr; }
	}
</style>
