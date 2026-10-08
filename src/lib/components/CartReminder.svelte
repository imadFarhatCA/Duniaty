<script>
	import { cart } from '$lib/stores/cart.svelte.js';
	import { page } from '$app/state';

	const REMIND_AFTER = 60 * 60 * 1000; // 1 hour
	const DISMISS_KEY = 'duniaty-reminder-dismissed';

	let show = $state(false);

	function dismissedFor() {
		try { return sessionStorage.getItem(DISMISS_KEY); } catch { return null; }
	}

	function check() {
		const onCheckout = page.url.pathname.startsWith('/checkout');
		show =
			!onCheckout &&
			cart.items.length > 0 &&
			cart.lastActivity > 0 &&
			Date.now() - cart.lastActivity >= REMIND_AFTER &&
			dismissedFor() !== String(cart.lastActivity);
	}

	function dismiss() {
		try { sessionStorage.setItem(DISMISS_KEY, String(cart.lastActivity)); } catch {}
		show = false;
	}

	$effect(() => {
		// re-check when the cart or route changes, and once a minute while the tab stays open
		cart.lastActivity;
		cart.items.length;
		page.url.pathname;
		check();
		const timer = setInterval(check, 60 * 1000);
		return () => clearInterval(timer);
	});
</script>

{#if show}
	<div class="reminder" role="status">
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
		<div class="reminder-text">
			<strong>You left {cart.count} item{cart.count !== 1 ? 's' : ''} in your cart</strong>
			<span>Your order is waiting — it only takes a minute to complete.</span>
		</div>
		<a href="/checkout" class="btn btn-gold reminder-btn" onclick={dismiss}>Complete Order</a>
		<button class="reminder-close" onclick={dismiss} aria-label="Dismiss reminder">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
		</button>
	</div>
{/if}

<style>
	.reminder {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 300;
		display: flex;
		align-items: center;
		gap: 14px;
		background: var(--color-navy);
		color: rgba(255,255,255,0.9);
		padding: 14px 18px;
		border-radius: var(--radius-lg);
		box-shadow: 0 12px 40px rgba(0,0,0,0.25);
		max-width: calc(100vw - 32px);
		animation: slideUp 0.35s ease;
	}
	@keyframes slideUp {
		from { opacity: 0; transform: translate(-50%, 16px); }
		to { opacity: 1; transform: translate(-50%, 0); }
	}
	.reminder-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.reminder-text strong { font-size: 0.92rem; color: #fff; }
	.reminder-text span { font-size: 0.8rem; color: rgba(255,255,255,0.65); }
	.reminder-btn {
		white-space: nowrap;
		padding: 10px 18px;
		font-size: 0.85rem;
	}
	.reminder-close {
		background: none;
		border: none;
		color: rgba(255,255,255,0.6);
		cursor: pointer;
		padding: 4px;
		display: flex;
	}
	.reminder-close:hover { color: #fff; }

	@media (max-width: 600px) {
		.reminder { flex-wrap: wrap; bottom: 12px; }
		.reminder-btn { flex: 1; text-align: center; }
	}
</style>
