<script>
	import StarRating from './StarRating.svelte';
	import { cart } from '$lib/stores/cart.svelte.js';

	let { product } = $props();

	const discountedPrice = product.offer
		? +(product.price * (1 - product.offer.discount / 100)).toFixed(2)
		: null;
</script>

<div class="card">
	<a href="/products/{product.slug}" class="card-image">
		<img src={product.image} alt={product.name} />
		{#if product.offer}
			<span class="offer-badge">{product.offer.label}</span>
		{/if}
		{#if product.bio}
			<span class="bio-tag">BIO</span>
		{/if}
	</a>

	<div class="card-body">
		<span class="card-category">{product.category}</span>
		<a href="/products/{product.slug}" class="card-title">{product.name}</a>
		<StarRating rating={product.rating} />

		<div class="card-meta">
			<span class="denomination">{product.denomination}</span>
			<span class="origin">{product.origin}</span>
		</div>

		<div class="card-bottom">
			<div class="price-row">
				{#if discountedPrice}
					<span class="price-old">${product.price.toFixed(2)}</span>
					<span class="price">${discountedPrice.toFixed(2)}</span>
				{:else}
					<span class="price">${product.price.toFixed(2)}</span>
				{/if}
			</div>

			<div class="stock-row">
				{#if product.inStock}
					<span class="badge badge-success">
						<span class="dot green"></span> In Stock
					</span>
				{:else}
					<span class="badge badge-error">
						<span class="dot red"></span> Out of Stock
					</span>
				{/if}
			</div>

			<button
				class="btn btn-primary add-btn"
				disabled={!product.inStock}
				onclick={() => cart.add(product)}
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
	.bio-tag {
		position: absolute;
		top: 12px;
		right: 12px;
		background: rgba(74,124,89,0.9);
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 3px 8px;
		border-radius: 4px;
		letter-spacing: 0.05em;
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
	.origin {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		display: flex;
		align-items: center;
	}
	.card-bottom {
		margin-top: auto;
		padding-top: 12px;
		border-top: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.price-row {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.price {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--color-navy);
	}
	.price-old {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		text-decoration: line-through;
	}
	.stock-row {
		display: flex;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
	}
	.dot.green { background: var(--color-success); }
	.dot.red { background: var(--color-error); }
	.add-btn {
		width: 100%;
		font-size: 0.85rem;
		padding: 10px;
	}
</style>
