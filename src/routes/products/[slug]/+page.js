import { getProductBySlug } from '$lib/data/products.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const product = getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	return { product };
}
