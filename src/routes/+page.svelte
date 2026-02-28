<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedProducts from '$lib/components/FeaturedProducts.svelte';
	import SpecialOffers from '$lib/components/SpecialOffers.svelte';
</script>

<Hero />
<FeaturedProducts />
<SpecialOffers />

<!-- Story Teaser -->
<section class="story-section section">
	<div class="container story-inner">
		<div class="story-text">
			<h2 class="section-title">Our Story</h2>
			<p>Every jar, every bottle carries the warmth of Lebanese kitchens and the knowledge of artisans who have perfected their craft over generations. From the olive groves of the north to the fertile Bekaa Valley, we bring you the finest organic produce Lebanon has to offer.</p>
			<a href="/about" class="btn btn-outline">Learn More</a>
		</div>
		<div class="story-visual">
			<img src="/products/makdous.jpg" alt="Traditional Lebanese Makdous" />
		</div>
	</div>
</section>

<style>
	.story-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.story-text p {
		font-size: 1.05rem;
		line-height: 1.75;
		color: var(--color-text-light);
		margin-bottom: 24px;
	}
	.story-visual {
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: 0 12px 32px rgba(0,0,0,0.08);
	}
	.story-visual img {
		width: 100%;
		aspect-ratio: 4/3;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.story-inner {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.story-visual { order: -1; }
	}
</style>
