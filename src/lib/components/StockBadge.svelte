<script>
	let { inStock, bio = false } = $props();
</script>

<div class="badges-row">
	{#if inStock}
		<span class="badge badge-success"><span class="dot green"></span> In Stock</span>
	{:else}
		<span class="badge badge-error"><span class="dot red"></span> Out of Stock</span>
	{/if}
	{#if bio}
		<span class="badge badge-bio">BIO Certified</span>
	{/if}
</div>

<style>
	.badges-row {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
	}
	.dot.green { background: var(--color-success); }
	.dot.red { background: var(--color-error); }
</style>
