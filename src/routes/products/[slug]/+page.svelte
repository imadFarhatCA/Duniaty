<script>
	import StarRating from '$lib/components/StarRating.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import PriceDisplay from '$lib/components/PriceDisplay.svelte';
	import StockBadge from '$lib/components/StockBadge.svelte';
	import QtySelector from '$lib/components/QtySelector.svelte';
	import { getDiscountedPrice } from '$lib/data/constants.js';
	import { cart } from '$lib/stores/cart.svelte.js';
	import { products } from '$lib/data/products.js';

	let { data } = $props();
	let product = $derived(data.product);
	let qty = $state(1);

	let discountedPrice = $derived(getDiscountedPrice(product.price, product.offer));

	let related = $derived(
		products
			.filter(p => p.category === product.category && p.id !== product.id)
			.slice(0, 4)
	);

	function addToCart() {
		for (let i = 0; i < qty; i++) {
			cart.add(product);
		}
		qty = 1;
	}
</script>

<svelte:head>
	<title>{product.name} | Duniaty by Dunia</title>
	<meta name="description" content={product.description} />
</svelte:head>

<section class="detail section">
	<div class="container">
		<a href="/products" class="back-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
			Back to Products
		</a>

		<div class="product-grid">
			<div class="product-image">
				<img src={product.image} alt={product.name} />
				{#if product.offer}
					<span class="offer-badge badge-offer">{product.offer.label}</span>
				{/if}
			</div>

			<div class="product-info">
				<span class="category-label">{product.category}</span>
				<h1>{product.name}</h1>
				<StarRating rating={product.rating} />

				<PriceDisplay price={product.price} offer={product.offer} size="lg" />

				<p class="description">{product.description}</p>

				<div class="meta-grid">
					<div class="meta-item">
						<span class="meta-label">Denomination</span>
						<span class="meta-value">{product.denomination}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Origin</span>
						<span class="meta-value">{product.origin}</span>
					</div>
				</div>

				<div class="ingredients">
					<span class="meta-label">Ingredients</span>
					<div class="ingredient-chips">
						{#each product.ingredients as ing}
							<span class="chip">{ing}</span>
						{/each}
					</div>
				</div>

				<StockBadge inStock={product.inStock} bio={product.bio} />

				<div class="add-row">
					<QtySelector bind:value={qty} />
					<button class="btn btn-primary add-btn" disabled={!product.inStock} onclick={addToCart}>
						{#if product.inStock}
							Add to Cart — ${((discountedPrice || product.price) * qty).toFixed(2)}
						{:else}
							Out of Stock
						{/if}
					</button>
				</div>
			</div>
		</div>

		{#if related.length > 0}
			<div class="related">
				<h2 class="section-title">You May Also Like</h2>
				<div class="related-grid">
					{#each related as p (p.id)}
						<ProductCard product={p} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		color: var(--color-text-light);
		margin-bottom: 32px;
		transition: color var(--ease);
	}
	.back-link:hover { color: var(--color-navy); }

	.product-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: flex-start;
	}
	.product-image {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: #f5f0e8;
	}
	.product-image img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}
	.offer-badge {
		position: absolute;
		top: 16px;
		left: 16px;
		padding: 6px 14px;
		font-size: 0.8rem;
		font-weight: 700;
		border-radius: 999px;
	}

	.product-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.category-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-gold);
	}
	h1 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.2;
	}
	.description {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-text-light);
	}
	.meta-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.meta-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}
	.meta-value {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
	}
	.ingredient-chips {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 6px;
	}
	.chip {
		padding: 4px 12px;
		font-size: 0.8rem;
		background: var(--color-cream-dark);
		border-radius: 999px;
		color: var(--color-text-light);
	}
	.add-row {
		display: flex;
		gap: 12px;
		margin-top: 8px;
	}
	.add-btn {
		flex: 1;
		font-size: 0.95rem;
	}

	.related {
		margin-top: 80px;
		padding-top: 48px;
		border-top: 1px solid var(--color-border);
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		margin-top: 24px;
	}

	@media (max-width: 768px) {
		.product-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		h1 { font-size: 1.6rem; }
		.add-row { flex-direction: column; }
		.add-btn { width: 100%; }
		.related-grid { grid-template-columns: 1fr 1fr; }
	}
</style>
