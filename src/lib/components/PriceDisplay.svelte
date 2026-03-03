<script>
	import { getDiscountedPrice } from '$lib/data/constants.js';
	let { price, offer = null, size = 'default' } = $props();
	let discounted = $derived(getDiscountedPrice(price, offer));
</script>

<div class="price-row" class:lg={size === 'lg'}>
	{#if discounted}
		<span class="price-old">${price.toFixed(2)}</span>
		<span class="price">${discounted.toFixed(2)}</span>
	{:else}
		<span class="price">${price.toFixed(2)}</span>
	{/if}
</div>

<style>
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
	.price-row.lg .price {
		font-size: 1.5rem;
	}
	.price-row.lg .price-old {
		font-size: 1rem;
	}
	.price-row.lg { gap: 10px; }
</style>
