<script>
	import { navLinks } from '$lib/data/constants.js';
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-inner container">
		<div class="footer-col brand">
			<img src="/logo.png" alt="Duniaty" class="footer-logo" />
			<p>Artisanal Lebanese delicacies crafted with tradition and care. Fresh organic products made in Lebanon.</p>
		</div>

		<div class="footer-col">
			<h4>Quick Links</h4>
			<ul>
				{#each navLinks as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</div>

		<div class="footer-col">
			<h4>Get in Touch</h4>
			<ul>
				<li>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					info@duniaty.com
				</li>
				<li>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
					Beirut, Lebanon
				</li>
			</ul>
			<div class="social-links">
				<a href="#" aria-label="Instagram">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</a>
				<a href="#" aria-label="Facebook">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
				</a>
				<a href="#" aria-label="WhatsApp">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
				</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom container">
		<p>&copy; {year} Duniaty by Dunia. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-navy);
		color: rgba(255,255,255,0.75);
		padding: 60px 0 0;
		margin-top: 80px;
	}
	.footer-inner {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr;
		gap: 48px;
		padding-bottom: 40px;
	}
	.footer-logo {
		height: 48px;
		width: auto;
		filter: brightness(0) invert(1);
		margin-bottom: 16px;
	}
	.brand p {
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(255,255,255,0.55);
	}
	h4 {
		font-family: var(--font-sans);
		color: var(--color-gold);
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 16px;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		margin-bottom: 10px;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	li svg { flex-shrink: 0; color: var(--color-gold); }
	a {
		color: rgba(255,255,255,0.7);
		transition: color var(--ease);
	}
	a:hover { color: var(--color-gold); }
	.social-links {
		display: flex;
		gap: 12px;
		margin-top: 16px;
	}
	.social-links a {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255,255,255,0.15);
		border-radius: var(--radius-sm);
		transition: all var(--ease);
	}
	.social-links a:hover {
		border-color: var(--color-gold);
		background: rgba(201,168,76,0.1);
	}
	.footer-bottom {
		border-top: 1px solid rgba(255,255,255,0.1);
		padding: 20px 24px;
		text-align: center;
	}
	.footer-bottom p {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.4);
		margin: 0;
	}

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: 32px;
			text-align: center;
		}
		.footer-logo { margin: 0 auto 16px; }
		li { justify-content: center; }
		.social-links { justify-content: center; }
	}
</style>
