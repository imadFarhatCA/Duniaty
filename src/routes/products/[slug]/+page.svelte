<script>
	import StarRating from '$lib/components/StarRating.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_URL, SITE_NAME } from '$lib/data/constants.js';
	import PriceDisplay from '$lib/components/PriceDisplay.svelte';
	import StockBadge from '$lib/components/StockBadge.svelte';
	import QtySelector from '$lib/components/QtySelector.svelte';
	import { getDiscountedPrice } from '$lib/data/constants.js';
	import { cart } from '$lib/stores/cart.svelte.js';
	import { products } from '$lib/data/products.js';
	import { page } from '$app/state';

	let { data } = $props();
	let product = $derived(data.product);
	let qty = $state(1);
	let selectedSize = $state(null);

	// Reset the size choice when navigating to a different product;
	// a ?size= query param (from a size card in the grid) pre-selects that size.
	$effect(() => {
		product.slug;
		selectedSize = page.url.searchParams.get('size');
		qty = 1;
	});

	// The active size: the user's pick, or the default denomination (= what the photo shows)
	let currentSize = $derived(
		product.sizes
			? (product.sizes.find(s => s.size === selectedSize) ?? product.sizes.find(s => s.size === product.denomination) ?? product.sizes[0])
			: null
	);
	let currentPrice = $derived(currentSize ? currentSize.price : (getDiscountedPrice(product.price, product.offer) || product.price));
	let currentImage = $derived(currentSize?.image ?? product.image);

	let related = $derived(
		products
			.filter(p => p.category === product.category && p.id !== product.id)
			.slice(0, 4)
	);

	function addToCart() {
		for (let i = 0; i < qty; i++) {
			cart.add(product, currentSize);
		}
		qty = 1;
	}
</script>

{#key product.slug}
	<Seo
		title={`${product.name} (${product.sizes ? product.sizes.map(s => s.size).join(' / ') : product.denomination}) | ${SITE_NAME}`}
		description={`${product.description} Made in Lebanon, 100% organic — $4 delivery everywhere in Lebanon.`}
		path={`/products/${product.slug}`}
		image={SITE_URL + product.image}
		type="product"
		jsonLd={{
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: product.name,
			image: (product.sizes ? product.sizes.filter(s => s.image).map(s => SITE_URL + s.image) : null) || [SITE_URL + product.image],
			description: product.description,
			sku: `DUNIATY-${product.id}`,
			brand: { '@type': 'Brand', name: 'Duniaty' },
			offers: product.sizes
				? {
						'@type': 'AggregateOffer',
						priceCurrency: 'USD',
						lowPrice: Math.min(...product.sizes.map(s => s.price)),
						highPrice: Math.max(...product.sizes.map(s => s.price)),
						offerCount: product.sizes.length,
						availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
						url: `${SITE_URL}/products/${product.slug}`
					}
				: {
						'@type': 'Offer',
						priceCurrency: 'USD',
						price: product.price,
						availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
						url: `${SITE_URL}/products/${product.slug}`
					}
		}}
	/>
{/key}

<section class="detail section">
	<div class="container">
		<a href="/products" class="back-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
			Back to Products
		</a>

		<div class="product-grid">
			<div class="product-image">
				<img src={currentImage} alt={product.name} />
				{#if product.offer}
					<span class="offer-badge badge-offer">{product.offer.label}</span>
				{/if}
			</div>

			<div class="product-info">
				<span class="category-label">{product.category}</span>
				<h1>{product.name}</h1>
				<StarRating rating={product.rating} />

				<PriceDisplay price={currentPrice} offer={currentSize ? null : product.offer} size="lg" />

				<p class="description">{product.description}</p>

				{#if product.sizes}
					<div class="size-select">
						<span class="meta-label">Size</span>
						<div class="size-options">
							{#each product.sizes as s (s.size)}
								<button
									class="size-btn"
									class:active={currentSize.size === s.size}
									onclick={() => selectedSize = s.size}
								>
									<span class="size-name">{s.size}</span>
									<span class="size-price">${s.price}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}

				<div class="meta-grid">
					<div class="meta-item">
						<span class="meta-label">Denomination</span>
						<span class="meta-value">{currentSize ? currentSize.size : product.denomination}</span>
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
							Add to Cart — ${(currentPrice * qty).toFixed(2)}
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
	.size-select {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.size-options {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.size-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 10px 20px;
		background: var(--color-warm-white);
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--ease);
	}
	.size-btn:hover { border-color: var(--color-gold); }
	.size-btn.active {
		border-color: var(--color-navy);
		background: var(--color-navy);
	}
	.size-name {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text);
	}
	.size-price {
		font-size: 0.8rem;
		color: var(--color-text-light);
	}
	.size-btn.active .size-name { color: #fff; }
	.size-btn.active .size-price { color: var(--color-gold-light); }

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
