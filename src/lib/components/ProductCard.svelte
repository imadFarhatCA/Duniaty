<script>
	import PriceDisplay from './PriceDisplay.svelte';
	import StockBadge from './StockBadge.svelte';
	import { cart } from '$lib/stores/cart.svelte.js';

	// `variant` is an optional {size, price, image} entry: the card then represents
	// that specific size instead of the product's default one.
	let { product, variant = null } = $props();

	let cardImage = $derived(variant?.image ?? product.image);
	let cardPrice = $derived(variant ? variant.price : product.price);
	let cardDenom = $derived(variant ? variant.size : product.denomination);
	let cardHref = $derived(variant && product.sizes ? `/products/${product.slug}?size=${variant.size}` : `/products/${product.slug}`);

	function addToCart() {
		const sel = product.sizes?.find(s => s.size === cardDenom) ?? null;
		cart.add(product, sel);
	}
</script>

<div class="card">
	<a href={cardHref} class="card-image">
		<img src={cardImage} alt="{product.name} {cardDenom}" />
		{#if product.offer}
			<span class="offer-badge">{product.offer.label}</span>
		{/if}
	</a>

	<div class="card-body">
		<span class="card-category">{product.category}</span>
		<a href={cardHref} class="card-title">{product.name}</a>

		<div class="card-meta">
			<span class="denomination">{cardDenom}</span>
		</div>

		<div class="card-bottom">
			<PriceDisplay price={cardPrice} offer={product.offer} />
			<StockBadge inStock={product.inStock} />

			<button
				class="btn btn-primary add-btn"
				disabled={!product.inStock}
				onclick={addToCart}
			>
				{#if product.inStock}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
					Add to Cart
				{:else}
					Unavailable
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.card {
		background: var(--color-warm-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: all var(--ease);
		display: flex;
		flex-direction: column;
	}
	.card:hover {
		box-shadow: 0 8px 28px rgba(0,0,0,0.08);
		transform: translateY(-3px);
	}
	.card-image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 1;
		background: #f5f0e8;
	}
	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}
	.card:hover .card-image img {
		transform: scale(1.04);
	}
	.offer-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		background: var(--color-offer);
		color: white;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 999px;
		letter-spacing: 0.02em;
	}
	.card-body {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
	}
	.card-category {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-gold);
	}
	.card-title {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-navy);
		line-height: 1.3;
		transition: color var(--ease);
	}
	.card-title:hover { color: var(--color-gold); }
	.card-meta {
		display: flex;
		gap: 12px;
		margin-top: 4px;
	}
	.denomination {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 2px 8px;
		background: var(--color-cream-dark);
		border-radius: 4px;
		color: var(--color-text-light);
	}
	.card-bottom {
		margin-top: auto;
		padding-top: 12px;
		border-top: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.add-btn {
		width: 100%;
		font-size: 0.85rem;
		padding: 10px;
	}
</style>
