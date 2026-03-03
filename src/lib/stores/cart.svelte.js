import { getDiscountedPrice } from '$lib/data/constants.js';

let items = $state([]);

export const cart = {
	get items() { return items; },
	get count() { return items.reduce((sum, i) => sum + i.qty, 0); },
	get total() { return items.reduce((sum, i) => sum + i.price * i.qty, 0); },

	add(product) {
		const existing = items.find(i => i.id === product.id);
		if (existing) {
			items = items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
		} else {
			items = [...items, {
				id: product.id,
				name: product.name,
				price: getDiscountedPrice(product.price, product.offer) || product.price,
				image: product.image,
				qty: 1
			}];
		}
	},

	remove(id) {
		items = items.filter(i => i.id !== id);
	},

	updateQty(id, qty) {
		if (qty <= 0) { this.remove(id); return; }
		items = items.map(i => i.id === id ? { ...i, qty } : i);
	},

	clear() {
		items = [];
	}
};
