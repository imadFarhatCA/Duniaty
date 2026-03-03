<script>
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart.svelte.js';
	import { navLinks } from '$lib/data/constants.js';

	let { onCartClick } = $props();
	let mobileOpen = $state(false);
</script>

<nav class="navbar">
	<div class="nav-inner container">
		<a href="/" class="nav-logo">
			<img src="/logo.png" alt="Duniaty" />
		</a>

		<div class="nav-links" class:open={mobileOpen}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={$page.url.pathname === link.href || (link.href !== '/' && $page.url.pathname.startsWith(link.href))}
					onclick={() => mobileOpen = false}
				>{link.label}</a>
			{/each}
		</div>

		<div class="nav-actions">
			<button class="cart-btn" onclick={onCartClick} aria-label="Open cart">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
					<line x1="3" y1="6" x2="21" y2="6" />
					<path d="M16 10a4 4 0 01-8 0" />
				</svg>
				{#if cart.count > 0}
					<span class="cart-badge">{cart.count}</span>
				{/if}
			</button>

			<button class="hamburger" onclick={() => mobileOpen = !mobileOpen} aria-label="Menu">
				<span class="bar" class:open={mobileOpen}></span>
				<span class="bar" class:open={mobileOpen}></span>
				<span class="bar" class:open={mobileOpen}></span>
			</button>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-warm-white);
		border-bottom: 1px solid var(--color-border);
		backdrop-filter: blur(12px);
	}
	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 84px;
		padding: 0 32px;
	}
	.nav-logo img {
		height: 64px;
		width: auto;
	}
	.nav-links {
		display: flex;
		gap: 32px;
	}
	.nav-link {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text-light);
		transition: color var(--ease);
		position: relative;
	}
	.nav-link:hover, .nav-link.active {
		color: var(--color-navy);
	}
	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-gold);
		border-radius: 1px;
	}
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.cart-btn {
		position: relative;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-navy);
		padding: 6px;
		display: flex;
		align-items: center;
	}
	.cart-badge {
		position: absolute;
		top: -2px;
		right: -4px;
		background: var(--color-gold);
		color: var(--color-navy-dark);
		font-size: 0.65rem;
		font-weight: 700;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
	}
	.bar {
		width: 22px;
		height: 2px;
		background: var(--color-navy);
		border-radius: 2px;
		transition: all var(--ease);
	}
	.bar.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
	.bar.open:nth-child(2) { opacity: 0; }
	.bar.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

	@media (max-width: 768px) {
		.hamburger { display: flex; }
		.nav-links {
			display: none;
			position: absolute;
			top: 64px;
			left: 0;
			right: 0;
			background: var(--color-warm-white);
			flex-direction: column;
			padding: 16px 24px;
			gap: 16px;
			border-bottom: 1px solid var(--color-border);
			box-shadow: 0 4px 12px rgba(0,0,0,0.06);
		}
		.nav-links.open { display: flex; }
	}
</style>
