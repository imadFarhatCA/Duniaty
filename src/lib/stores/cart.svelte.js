import { getDiscountedPrice } from '$lib/data/constants.js';

const STORAGE_KEY = 'duniaty-cart';

function loadSaved() {
	try {
		if (typeof localStorage === 'undefined') return { items: [], at: 0 };
		const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
		if (Array.isArray(raw)) return { items: raw, at: Date.now() }; // legacy format
		return raw && Array.isArray(raw.items) ? raw : { items: [], at: 0 };
	} catch {
		return { items: [], at: 0 };
	}
}

function save(list, at) {
	try {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: list, at }));
		}
	} catch {
		// storage unavailable (private mode etc.) — cart still works in memory
	}
}

const saved = loadSaved();
let items = $state(saved.items);
let lastActivity = $state(saved.at);

export const cart = {
	get items() { return items; },
	get count() { return items.reduce((sum, i) => sum + i.qty, 0); },
	get total() { return items.reduce((sum, i) => sum + i.price * i.qty, 0); },
	get lastActivity() { return lastActivity; },

	// `size` is an optional {size, price} entry from product.sizes; without it the
	// product's default denomination/price is used. Each size is its own cart line.
	add(product, size = null) {
		const sel = size ?? product.sizes?.find(s => s.size === product.denomination) ?? null;
		const price = sel ? sel.price : (getDiscountedPrice(product.price, product.offer) || product.price);
		const sizeLabel = sel ? sel.size : product.denomination;
		const key = `${product.id}-${sizeLabel}`;
		const existing = items.find(i => i.key === key);
		if (existing) {
			items = items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
		} else {
			items = [...items, {
				key,
				id: product.id,
				name: product.name,
				size: sizeLabel,
				price,
				image: (sel && sel.image) || product.image,
				qty: 1
			}];
		}
		lastActivity = Date.now();
		save(items, lastActivity);
	},

	remove(key) {
		items = items.filter(i => i.key !== key);
		lastActivity = Date.now();
		save(items, lastActivity);
	},

	updateQty(key, qty) {
		if (qty <= 0) { this.remove(key); return; }
		items = items.map(i => i.key === key ? { ...i, qty } : i);
		lastActivity = Date.now();
		save(items, lastActivity);
	},

	clear() {
		items = [];
		lastActivity = Date.now();
		save(items, lastActivity);
	}
};
