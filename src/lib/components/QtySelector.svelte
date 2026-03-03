<script>
	let { value = $bindable(1), min = 1, size = 'default', onchange = null } = $props();

	function dec() {
		value = Math.max(min, value - 1);
		onchange?.(value);
	}
	function inc() {
		value++;
		onchange?.(value);
	}
</script>

<div class="qty" class:sm={size === 'sm'}>
	<button onclick={dec}>−</button>
	<span>{value}</span>
	<button onclick={inc}>+</button>
</div>

<style>
	.qty {
		display: flex;
		align-items: center;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		overflow: hidden;
	}
	.qty button {
		width: 40px;
		height: 44px;
		border: none;
		background: var(--color-cream);
		cursor: pointer;
		font-size: 1rem;
		color: var(--color-text);
	}
	.qty button:hover { background: var(--color-cream-dark); }
	.qty span {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.95rem;
	}
	.qty.sm button {
		width: 28px;
		height: 28px;
		font-size: 0.9rem;
	}
	.qty.sm button:first-child { border-radius: 4px 0 0 4px; }
	.qty.sm button:last-child { border-radius: 0 4px 4px 0; }
	.qty.sm span {
		width: 32px;
		height: 28px;
		font-size: 0.85rem;
	}
</style>
