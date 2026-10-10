<script>
	import { cart } from '$lib/stores/cart.svelte.js';
	import { DELIVERY_FEE, WHISH_NUMBER, ORDER_EMAIL, WHATSAPP_NUMBER, WHISH_PAYMENT_LINK, CALLMEBOT_APIKEY } from '$lib/data/constants.js';

	let form = $state({
		name: '',
		phone: '',
		email: '',
		city: '',
		address: '',
		mapsLink: '',
		notes: ''
	});
	let payment = $state('whish');
	let submitting = $state(false);
	let locating = $state(false);
	let errorMsg = $state('');
	let placedOrder = $state(null); // set after a successful order
	let copied = $state(''); // which value was just copied

	async function copy(value, which) {
		let ok = false;
		try {
			await navigator.clipboard.writeText(value);
			ok = true;
		} catch {
			// fallback for older browsers / stricter contexts
			try {
				const ta = document.createElement('textarea');
				ta.value = value;
				ta.style.position = 'fixed';
				ta.style.opacity = '0';
				document.body.appendChild(ta);
				ta.select();
				ok = document.execCommand('copy');
				document.body.removeChild(ta);
			} catch {}
		}
		if (ok) {
			copied = which;
			setTimeout(() => { if (copied === which) copied = ''; }, 2500);
		}
	}

	function notifyOwner(orderNo, totalAmount, name, phone) {
		// Automatic WhatsApp alert to the owner's phone via CallMeBot (when configured).
		// Fire-and-forget: never blocks or fails the order.
		if (!CALLMEBOT_APIKEY) return;
		try {
			const text = `Duniaty: new order ${orderNo} — $${totalAmount.toFixed(2)} from ${name} (${phone}). Details in your email.`;
			fetch(`https://api.callmebot.com/whatsapp.php?phone=+${WHATSAPP_NUMBER}&apikey=${CALLMEBOT_APIKEY}&text=${encodeURIComponent(text)}`, { mode: 'no-cors' });
		} catch {}
	}

	function shareLocation() {
		if (!navigator.geolocation) {
			errorMsg = 'Your browser cannot share location — please paste a Google Maps link instead.';
			return;
		}
		locating = true;
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				form.mapsLink = `https://www.google.com/maps?q=${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}`;
				locating = false;
			},
			() => {
				locating = false;
				errorMsg = 'Could not read your location. You can paste a Google Maps link instead (open Google Maps, press and hold your location, tap Share).';
			},
			{ enableHighAccuracy: true, timeout: 12000 }
		);
	}

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
		const payInstructions =
			payment === 'whish'
				? `Please open the Whish Money app, choose Send Money, enter ${WHISH_NUMBER}, and send $${total.toFixed(2)} with "${orderNo}" in the note. Your order ships as soon as the transfer arrives.`
				: `Cash on Delivery — please prepare $${total.toFixed(2)} in cash for when your order arrives.`;
		const payload = {
			_subject: `New Duniaty order ${orderNo} — $${total.toFixed(2)} (${payment === 'whish' ? 'Whish' : 'Cash on Delivery'})`,
			_template: 'box',
			_replyto: form.email,
			_autoresponse:
				`Thank you for your order from Duniaty! 🌿\n\n` +
				`ORDER ${orderNo}\n` +
				`----------------------------------------\n` +
				`${orderLines()}\n` +
				`----------------------------------------\n` +
				`Subtotal: $${subtotal.toFixed(2)}\n` +
				`Delivery (all over Lebanon): $${DELIVERY_FEE.toFixed(2)}\n` +
				`TOTAL: $${total.toFixed(2)}\n\n` +
				`PAYMENT\n${payInstructions}\n\n` +
				`DELIVERY\nWe will call you on ${form.phone} to confirm delivery to: ${form.city} — ${form.address}\n\n` +
				`Duniaty by Dunia — Artisanal Lebanese Delicacies\n` +
				`duniatylb.com | WhatsApp +961 76 851 555 | Instagram @duniaty.lb`,
			'Order number': orderNo,
			'Payment method': payment === 'whish' ? `Whish Money transfer to ${WHISH_NUMBER}` : 'Cash on Delivery',
			'Items': orderLines(),
			'Subtotal': `$${subtotal.toFixed(2)}`,
			'Delivery': `$${DELIVERY_FEE.toFixed(2)}`,
			'Total': `$${total.toFixed(2)}`,
			'Customer name': form.name,
			'Customer phone': form.phone,
			'Customer email': form.email,
			'City / Area': form.city,
			'Full address': form.address,
			'Google Maps location': form.mapsLink || '— (not shared)',
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
			const waText =
				`New order ${orderNo} 🛒\n` +
				`${orderLines()}\n` +
				`Subtotal $${subtotal.toFixed(2)} + Delivery $${DELIVERY_FEE.toFixed(2)} = TOTAL $${total.toFixed(2)}\n` +
				`Payment: ${payment === 'whish' ? `Whish transfer to ${WHISH_NUMBER}` : 'Cash on Delivery'}\n` +
				`Name: ${form.name}\n` +
				`Phone: ${form.phone}\n` +
				`Address: ${form.city} — ${form.address}` +
				(form.mapsLink ? `\nLocation: ${form.mapsLink}` : '');
			placedOrder = {
				number: orderNo,
				subtotal,
				total,
				payment,
				email: form.email,
				items: cart.items.map(i => ({ ...i })),
				waUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`
			};
			notifyOwner(orderNo, total, form.name, form.phone);
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
				<p class="order-no">Order number: <strong>{placedOrder.number}</strong> — a confirmation email was sent to <strong>{placedOrder.email}</strong></p>

				<div class="invoice">
					{#each placedOrder.items as item (item.key)}
						<div class="invoice-row">
							<span>{item.qty} × {item.name} <em>({item.size})</em></span>
							<span>${(item.price * item.qty).toFixed(2)}</span>
						</div>
					{/each}
					<div class="invoice-row muted"><span>Subtotal</span><span>${placedOrder.subtotal.toFixed(2)}</span></div>
					<div class="invoice-row muted"><span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
					<div class="invoice-row grand"><span>Total</span><span>${placedOrder.total.toFixed(2)}</span></div>
				</div>

				{#if placedOrder.payment === 'whish'}
					<div class="whish-box">
						<h2>Complete your payment with Whish</h2>
						{#if WHISH_PAYMENT_LINK}
							<a href={WHISH_PAYMENT_LINK} target="_blank" rel="noopener" class="btn btn-gold whish-pay-btn">
								Pay ${placedOrder.total.toFixed(2)} with Whish
							</a>
							<p class="hint">You'll pay securely inside Whish. Write <strong>{placedOrder.number}</strong> in the note.</p>
							<p class="hint whish-or">— or transfer manually —</p>
						{/if}
						<ol class="whish-steps">
							<li>Open the <a href="https://www.whish.money/" target="_blank" rel="noopener">Whish Money</a> app &rarr; <strong>Send Money</strong></li>
							<li>Send to this number:</li>
						</ol>
						<div class="whish-number">{WHISH_NUMBER}</div>
						<div class="copy-row">
							<button class="copy-btn" onclick={() => copy(WHISH_NUMBER.replace(/\s/g, ''), 'number')}>
								{copied === 'number' ? '✓ Copied' : 'Copy number'}
							</button>
							<button class="copy-btn" onclick={() => copy(placedOrder.total.toFixed(2), 'amount')}>
								{copied === 'amount' ? '✓ Copied' : `Copy amount ($${placedOrder.total.toFixed(2)})`}
							</button>
						</div>
						<ol class="whish-steps" start="3">
							<li>Send <strong>${placedOrder.total.toFixed(2)}</strong> and write <strong>{placedOrder.number}</strong> in the note</li>
						</ol>
						<p class="hint">Your order ships as soon as the payment is received.</p>
					</div>
				{:else}
					<div class="whish-box">
						<h2>Cash on Delivery</h2>
						<p>Please prepare <strong>${placedOrder.total.toFixed(2)}</strong> in cash. You pay when your order arrives.</p>
					</div>
				{/if}

				<a href={placedOrder.waUrl} target="_blank" rel="noopener" class="btn btn-gold wa-btn">
					📲 Send your order on WhatsApp
				</a>
				<p class="hint">One tap — your order details reach us on WhatsApp so we can confirm immediately.</p>
				<a href="/products" class="btn btn-outline">Continue Shopping</a>
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
						Email * <span class="label-hint">(your order confirmation is sent here)</span>
						<input type="email" required bind:value={form.email} placeholder="you@example.com" />
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
						Location on Google Maps <span class="label-hint">(so the driver finds you exactly)</span>
						<div class="location-row">
							<input type="url" bind:value={form.mapsLink} placeholder="Paste a Google Maps link, or use the button" />
							<button type="button" class="btn btn-outline locate-btn" onclick={shareLocation} disabled={locating}>
								{locating ? 'Locating…' : '📍 Use my location'}
							</button>
						</div>
						{#if form.mapsLink}
							<span class="location-ok">✓ Location attached — <a href={form.mapsLink} target="_blank" rel="noopener">preview on the map</a></span>
						{/if}
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
	.label-hint {
		font-weight: 400;
		color: var(--color-text-muted);
		font-size: 0.78rem;
	}
	.location-row {
		display: flex;
		gap: 8px;
	}
	.location-row input { flex: 1; }
	.locate-btn {
		white-space: nowrap;
		font-size: 0.82rem;
		padding: 10px 14px;
	}
	.location-ok {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-success);
	}
	.location-ok a { color: var(--color-success); text-decoration: underline; }

	.invoice {
		width: 100%;
		background: var(--color-warm-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 18px 22px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: left;
	}
	.invoice-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 0.92rem;
	}
	.invoice-row em { color: var(--color-gold); font-style: normal; font-weight: 600; font-size: 0.8rem; }
	.invoice-row.muted { color: var(--color-text-light); font-size: 0.85rem; }
	.invoice-row.grand {
		border-top: 2px solid var(--color-border);
		padding-top: 8px;
		font-weight: 700;
		color: var(--color-navy);
		font-size: 1rem;
	}
	.whish-steps {
		text-align: left;
		margin: 0 0 4px 18px;
		padding: 0;
		font-size: 0.9rem;
		color: rgba(255,255,255,0.85);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.whish-steps a { color: var(--color-gold); text-decoration: underline; }
	.wa-btn {
		width: 100%;
		padding: 15px;
		font-size: 1.02rem;
		text-align: center;
	}
	.whish-pay-btn {
		display: block;
		width: 100%;
		padding: 14px;
		font-size: 1rem;
		text-align: center;
		margin-bottom: 10px;
	}
	.whish-or {
		text-align: center;
		margin: 10px 0;
		letter-spacing: 0.05em;
	}
	.copy-row {
		display: flex;
		gap: 10px;
		justify-content: center;
		margin: 4px 0 12px;
		flex-wrap: wrap;
	}
	.copy-btn {
		background: rgba(255,255,255,0.1);
		border: 1px solid rgba(255,255,255,0.3);
		color: #fff;
		padding: 8px 16px;
		border-radius: 999px;
		font-size: 0.82rem;
		cursor: pointer;
		transition: all var(--ease);
	}
	.copy-btn:hover { background: rgba(255,255,255,0.2); }
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
