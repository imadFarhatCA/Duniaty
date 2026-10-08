<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { products, categories, getProductsByCategory } from '$lib/data/products.js';

	let selectedCategory = $state('All');
	let sortBy = $state('default');

	function sizeToGrams(s) {
		const m = String(s).match(/([\d.]+)\s*(kg|g|ml)/i);
		if (!m) return 0;
		const v = parseFloat(m[1]);
		return m[2].toLowerCase() === 'kg' ? v * 1000 : v;
	}

	// One card per size. Within each category: every product's largest size
	// first (the 1kg row), then the smaller sizes underneath (the 500g row).
	let filtered = $derived.by(() => {
		const list = getProductsByCategory(selectedCategory);
		const groups = [];
		for (const p of list) {
			let g = groups.find(x => x.cat === p.category);
			if (!g) { g = { cat: p.category, items: [] }; groups.push(g); }
			g.items.push(p);
		}
		const out = [];
		for (const g of groups) {
			const perProduct = g.items.map(p => ({
				p,
				sizes: p.sizes
					? [...p.sizes].sort((a, b) => sizeToGrams(b.size) - sizeToGrams(a.size))
					: [{ size: p.denomination, price: p.price, image: p.image }]
			}));
			const maxLen = Math.max(...perProduct.map(x => x.sizes.length));
			for (let i = 0; i < maxLen; i++) {
				for (const { p, sizes } of perProduct) {
					if (i < sizes.length) {
						out.push({ product: p, variant: sizes[i], key: `${p.id}-${sizes[i].size}` });
					}
				}
			}
		}
		if (sortBy === 'price-asc') out.sort((a, b) => a.variant.price - b.variant.price);
		if (sortBy === 'price-desc') out.sort((a, b) => b.variant.price - a.variant.price);
		if (sortBy === 'rating') out.sort((a, b) => b.product.rating - a.product.rating);
		if (sortBy === 'name') out.sort((a, b) => a.product.name.localeCompare(b.product.name));
		return out;
	});
</script>

<Seo
	title="Buy Lebanese Zaatar, Honey & Spices Online | Duniaty"
	description="Shop all Duniaty products: Lebanese mixed thyme zaatar, Zaa'Nuts and Zaa'Chili mixes, raw oak honey, cooking spice blends, extra virgin olive oil, pomegranate molasses, jams, makdous, spicy olives and keshek. Organic, made in Lebanon, delivered to your door."
	path="/products"
/>

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

		<div class="product-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</div>

		<div class="grid">
			{#each filtered as entry (entry.key)}
				<ProductCard product={entry.product} variant={entry.variant} />
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
