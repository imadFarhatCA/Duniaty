import { products } from '$lib/data/products.js';
import { SITE_URL } from '$lib/data/constants.js';

export function GET() {
	const pages = ['', '/products', '/about', ...products.map(p => `/products/${p.slug}`)];
	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		pages.map(p => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n') +
		`\n</urlset>`;
	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
