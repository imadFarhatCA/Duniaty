<script>
	import { cart } from '$lib/stores/cart.svelte.js';
	import { DELIVERY_FEE, WHISH_NUMBER, ORDER_EMAIL } from '$lib/data/constants.js';

	let form = $state({
		name: '',
		phone: '',
		email: '',
		city: '',
		address: '',
		notes: ''
	});
	let payment = $state('whish');
	let submitting = $state(false);
	let errorMsg = $state('');
	let placedOrder = $state(null); // set after a successful order

	let subtotal = $derived(cart.total);
	let total = $derived(subtotal + (cart.items.length > 0 ? DELIVERY_FEE : 0));

	function orderLines() {
		return cart.items
			.map(i => `${i.qty} x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`)
			.join('\n');
	}

	async function placeOrder(e) {
		e.preventDefault();
		if (cart.items.length === 0) return;
		submitting = true;
		errorMsg = '';

		const orderNo = 'DN-' + Date.now().toString().slice(-8);
		const payload = {
			_subject: `New Duniaty order ${orderNo} — $${total.toFixed(2)} (${payment === 'whish' ? 'Whish' : 'Cash on Delivery'})`,
			_template: 'box',
			'Order number': orderNo,
			'Payment method': payment === 'whish' ? `Whish Money transfer to ${WHISH_NUMBER}` : 'Cash on Delivery',
			'Items': orderLines(),
			'Subtotal': `$${subtotal.toFixed(2)}`,
			'Delivery': `$${DELIVERY_FEE.toFixed(2)}`,
			'Total': `$${total.toFixed(2)}`,
			'Customer name': form.name,
			'Customer phone': form.phone,
			'Customer email': form.email || '—',
			'City / Area': form.city,
			'Full address': form.address,
			'Notes': form.notes || '—'
		};

		try {
			const res = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok || data.success === 'false' || data.success === false) {
				throw new Error(data.message || 'Could not send the order.');
			}
			placedOrder = {
				number: orderNo,
				total,
				payment,
				items: cart.items.map(i => ({ ...i }))
			};
			cart.clear();
			window.scrollTo(0, 0);
		} catch (err) {
			errorMsg = 'Something went wrong sending your order. Please try again, or order directly on WhatsApp +961 76 851 555.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Checkout | Duniaty by Dunia</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="checkout section">
	<div class="container">
		{#if placedOrder}
			<div class="success">
				<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
				<h1>Thank you! Your order is placed.</h1>
				<p class="order-no">Order number: <strong>{placedOrder.number}</strong></p>

				{#if placedOrder.payment === 'whish'}
					<div class="whish-box">
						<h2>Complete your payment with Whish</h2>
						<p>Send <strong>${placedOrder.total.toFixed(2)}</strong> via the Whish Money app to:</p>
						<div class="whish-number">{WHISH_NUMBER}</div>
						<p class="hint">Please write <strong>{placedOrder.number}</strong> in the transfer note. Your order ships as soon as the payment is received.</p>
					</div>
				{:else}
					<div class="whish-box">
						<h2>Cash on Delivery</h2>
						<p>Please prepare <strong>${placedOrder.total.toFixed(2)}</strong> in cash. You pay when your order arrives.</p>
					</div>
				{/if}

				<p class="hint">We received your delivery details and will contact you on your phone number to confirm.</p>
				<a href="/products" class="btn btn-gold">Continue Shopping</a>
			</div>
		{:else if cart.items.length === 0}
			<div class="success">
				<h1>Your cart is empty</h1>
				<p class="hint">Add some products first, then come back to check out.</p>
				<a href="/products" class="btn btn-gold">Browse Products</a>
			</div>
		{:else}
			<h1 class="page-title">Checkout</h1>

			<div class="checkout-grid">
				<form class="form" onsubmit={placeOrder}>
					<h2>Delivery details</h2>

					<label>
						Full name *
						<input type="text" required bind:value={form.name} placeholder="Your full name" />
					</label>
					<label>
						Phone number *
						<input type="tel" required bind:value={form.phone} placeholder="e.g. 70 123 456" />
					</label>
					<label>
						Email (optional)
						<input type="email" bind:value={form.email} placeholder="you@example.com" />
					</label>
					<label>
						City / Area *
						<input type="text" required bind:value={form.city} placeholder="e.g. Beirut, Achrafieh" />
					</label>
					<label>
						Full address *
						<textarea required rows="3" bind:value={form.address} placeholder="Street, building, floor, nearest landmark..."></textarea>
					</label>
					<label>
						Notes (optional)
						<textarea rows="2" bind:value={form.notes} placeholder="Anything we should know for the delivery"></textarea>
					</label>

					<h2>Payment method</h2>
					<div class="pay-options">
						<label class="pay-option" class:selected={payment === 'whish'}>
							<input type="radio" name="payment" value="whish" bind:group={payment} />
							<div>
								<strong>Whish Money</strong>
								<span>Send the total to {WHISH_NUMBER} after placing the order</span>
							</div>
						</label>
						<label class="pay-option" class:selected={payment === 'cod'}>
							<input type="radio" name="payment" value="cod" bind:group={payment} />
							<div>
								<strong>Cash on Delivery</strong>
								<span>Pay in cash when your order arrives</span>
							</div>
						</label>
					</div>

					{#if errorMsg}
						<p class="error">{errorMsg}</p>
					{/if}

					<button type="submit" class="btn btn-gold place-btn" disabled={submitting}>
						{submitting ? 'Placing order…' : `Place Order — $${total.toFixed(2)}`}
					</button>
				</form>

				<aside class="summary">
					<h2>Your order</h2>
					{#each cart.items as item (item.key)}
						<div class="sum-row item">
							<img src={item.image} alt={item.name} />
							<div class="sum-info">
								<span class="sum-name">{item.name}</span>
								<span class="sum-size">{item.size} × {item.qty}</span>
							</div>
							<span class="sum-price">${(item.price * item.qty).toFixed(2)}</span>
						</div>
					{/each}
					<div class="sum-row">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div class="sum-row">
						<span>Delivery (all over Lebanon)</span>
						<span>${DELIVERY_FEE.toFixed(2)}</span>
					</div>
					<div class="sum-row total">
						<span>Total</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</aside>
			</div>
		{/if}
	</div>
</section>

<style>
	.page-title {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 32px;
	}
	.checkout-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 40px;
		align-items: flex-start;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.form h2, .summary h2 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 4px;
	}
	.form h2:not(:first-child) { margin-top: 18px; }
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text);
	}
	input, textarea {
		padding: 10px 14px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-warm-white);
		font-size: 0.95rem;
		font-family: inherit;
		color: var(--color-text);
	}
	input:focus, textarea:focus {
		outline: none;
		border-color: var(--color-gold);
	}
	.pay-options {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.pay-option {
		flex-direction: row;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-warm-white);
		cursor: pointer;
		font-weight: 400;
	}
	.pay-option.selected { border-color: var(--color-navy); }
	.pay-option input { margin-top: 3px; }
	.pay-option strong { display: block; font-size: 0.95rem; }
	.pay-option span { font-size: 0.8rem; color: var(--color-text-light); }
	.error {
		color: var(--color-error);
		font-size: 0.9rem;
		background: rgba(200, 60, 40, 0.07);
		padding: 10px 14px;
		border-radius: var(--radius-sm);
	}
	.place-btn {
		margin-top: 10px;
		padding: 14px;
		font-size: 1rem;
	}

	.summary {
		background: var(--color-warm-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		position: sticky;
		top: 90px;
	}
	.sum-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		font-size: 0.9rem;
		color: var(--color-text-light);
	}
	.sum-row.item {
		padding-bottom: 10px;
		border-bottom: 1px solid var(--color-border);
	}
	.sum-row.item img {
		width: 44px;
		height: 44px;
		object-fit: cover;
		border-radius: var(--radius-sm);
	}
	.sum-info { flex: 1; display: flex; flex-direction: column; }
	.sum-name { font-weight: 600; color: var(--color-text); font-size: 0.88rem; }
	.sum-size { font-size: 0.78rem; color: var(--color-gold); font-weight: 600; }
	.sum-price { font-weight: 600; color: var(--color-text); }
	.sum-row.total {
		border-top: 2px solid var(--color-border);
		padding-top: 12px;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-navy);
	}
	.sum-row.total span { color: var(--color-navy); }

	.success {
		max-width: 560px;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 40px 0;
	}
	.success h1 { font-size: 1.8rem; font-weight: 700; }
	.order-no { color: var(--color-text-light); }
	.whish-box {
		background: var(--color-navy);
		border-radius: var(--radius-lg);
		padding: 28px 32px;
		color: rgba(255,255,255,0.9);
		width: 100%;
	}
	.whish-box h2 { color: var(--color-gold); font-size: 1.1rem; margin-bottom: 10px; }
	.whish-number {
		font-size: 2rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.08em;
		margin: 12px 0;
		font-variant-numeric: tabular-nums;
	}
	.whish-box .hint { color: rgba(255,255,255,0.65); font-size: 0.85rem; }
	.hint { font-size: 0.9rem; color: var(--color-text-light); }

	@media (max-width: 768px) {
		.checkout-grid { grid-template-columns: 1fr; }
		.summary { position: static; order: -1; }
		.page-title { font-size: 1.8rem; }
	}
</style>
