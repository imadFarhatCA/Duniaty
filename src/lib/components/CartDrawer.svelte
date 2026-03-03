<script>
	import { cart } from '$lib/stores/cart.svelte.js';
	import QtySelector from './QtySelector.svelte';

	let { open = $bindable(false) } = $props();
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={() => open = false}></div>
{/if}

<aside class="drawer" class:open>
	<div class="drawer-header">
		<h3>Your Cart ({cart.count})</h3>
		<button class="close-btn" onclick={() => open = false} aria-label="Close cart">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
		</button>
	</div>

	<div class="drawer-body">
		{#if cart.items.length === 0}
			<div class="empty">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
				<p>Your cart is empty</p>
				<a href="/products" class="btn btn-outline" onclick={() => open = false}>Browse Products</a>
			</div>
		{:else}
			{#each cart.items as item (item.id)}
				<div class="cart-item">
					<img src={item.image} alt={item.name} class="item-img" />
					<div class="item-info">
						<span class="item-name">{item.name}</span>
						<span class="item-price">${item.price.toFixed(2)}</span>
						<QtySelector value={item.qty} min={0} size="sm" onchange={(v) => cart.updateQty(item.id, v)} />
					</div>
					<button class="remove-btn" onclick={() => cart.remove(item.id)} aria-label="Remove">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
					</button>
				</div>
			{/each}
		{/if}
	</div>

	{#if cart.items.length > 0}
		<div class="drawer-footer">
			<div class="subtotal">
				<span>Subtotal</span>
				<strong>${cart.total.toFixed(2)}</strong>
			</div>
			<button class="btn btn-gold checkout-btn">Checkout</button>
			<button class="clear-link" onclick={() => cart.clear()}>Clear Cart</button>
		</div>
	{/if}
</aside>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.35);
		z-index: 200;
		animation: fadeIn 0.2s ease;
	}
	@keyframes fadeIn { from { opacity: 0; } }

	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 380px;
		max-width: 90vw;
		background: var(--color-warm-white);
		z-index: 201;
		display: flex;
		flex-direction: column;
		transform: translateX(100%);
		transition: transform var(--ease);
		box-shadow: -8px 0 32px rgba(0,0,0,0.1);
	}
	.drawer.open { transform: translateX(0); }

	.drawer-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 24px;
		border-bottom: 1px solid var(--color-border);
	}
	.drawer-header h3 {
		font-size: 1.1rem;
		margin: 0;
	}
	.close-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-light);
		padding: 4px;
	}

	.drawer-body {
		flex: 1;
		overflow-y: auto;
		padding: 16px 24px;
	}
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 60px 0;
		text-align: center;
	}
	.empty p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.cart-item {
		display: flex;
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid var(--color-border);
		align-items: flex-start;
	}
	.item-img {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-sm);
		object-fit: cover;
		flex-shrink: 0;
	}
	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.item-name {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-navy);
	}
	.item-price {
		font-size: 0.85rem;
		color: var(--color-text-light);
	}
	.remove-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-muted);
		padding: 4px;
		flex-shrink: 0;
	}
	.remove-btn:hover { color: var(--color-error); }

	.drawer-footer {
		padding: 20px 24px;
		border-top: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.subtotal {
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
	}
	.subtotal strong {
		font-size: 1.15rem;
		color: var(--color-navy);
	}
	.checkout-btn { width: 100%; }
	.clear-link {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-muted);
		font-size: 0.8rem;
		text-align: center;
	}
	.clear-link:hover { color: var(--color-error); }
</style>
