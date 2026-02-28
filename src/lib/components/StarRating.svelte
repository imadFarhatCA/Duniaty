<script>
	let { rating = 0, max = 5 } = $props();
</script>

<div class="star-rating">
	{#each Array(max) as _, i}
		{@const fill = rating >= i + 1 ? 'full' : rating >= i + 0.5 ? 'half' : 'empty'}
		<svg width="16" height="16" viewBox="0 0 24 24" class="star {fill}">
			{#if fill === 'full'}
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-gold)" />
			{:else if fill === 'half'}
				<defs>
					<linearGradient id="half-{i}">
						<stop offset="50%" stop-color="var(--color-gold)" />
						<stop offset="50%" stop-color="var(--color-border)" />
					</linearGradient>
				</defs>
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-{i})" />
			{:else}
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-border)" />
			{/if}
		</svg>
	{/each}
	<span class="rating-num">{rating.toFixed(1)}</span>
</div>

<style>
	.star-rating {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.star { flex-shrink: 0; }
	.rating-num {
		margin-left: 6px;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-light);
	}
</style>
