export const categories = ['All', 'Oils & Vinegars', 'Jams & Preserves', 'Pickles & Olives', 'Honey', 'Condiments'];

export const products = [
	{
		id: 1,
		name: 'Extra Virgin Olive Oil',
		slug: 'olive-oil',
		description: 'Cold-pressed extra virgin olive oil from century-old groves in Northern Lebanon. Rich, fruity flavor with a peppery finish — perfect for drizzling over salads, hummus, and grilled vegetables.',
		category: 'Oils & Vinegars',
		price: 18.99,
		denomination: '500ml',
		origin: 'North Lebanon',
		ingredients: ['100% Organic Olives'],
		inStock: true,
		featured: true,
		offer: null,
		image: '/products/olive-oil.jpg',
		rating: 4.8,
		bio: true
	},
	{
		id: 2,
		name: 'Pomegranate Molasses',
		slug: 'pomegranate-molasses',
		description: 'Traditional thick pomegranate reduction, slow-cooked to a deep, tangy sweetness. Essential for Lebanese salads, marinades, and kibbeh.',
		category: 'Condiments',
		price: 12.99,
		denomination: '350ml',
		origin: 'Mount Lebanon',
		ingredients: ['100% Organic Pomegranate Juice'],
		inStock: true,
		featured: true,
		offer: { discount: 15, label: '15% OFF' },
		image: '/products/pomegranate-molasses.jpg',
		rating: 4.9,
		bio: true
	},
	{
		id: 3,
		name: 'Fig Jam',
		slug: 'fig-jam',
		description: 'Handmade fig preserve with whole fruit pieces and sesame seeds. Perfect on toast, paired with cheese, or as a glaze for roasted meats.',
		category: 'Jams & Preserves',
		price: 10.99,
		denomination: '800g',
		origin: 'Bekaa Valley',
		ingredients: ['Organic Figs', 'Cane Sugar', 'Lemon Juice', 'Sesame Seeds'],
		inStock: true,
		featured: false,
		offer: null,
		image: '/products/fig-jam.jpg',
		rating: 4.7,
		bio: true
	},
	{
		id: 4,
		name: 'Strawberry Jam',
		slug: 'strawberry-jam',
		description: 'Small-batch strawberry preserve made from sun-ripened Lebanese strawberries. Naturally sweet with visible fruit pieces.',
		category: 'Jams & Preserves',
		price: 9.99,
		denomination: '500g',
		origin: 'Bekaa Valley',
		ingredients: ['Organic Strawberries', 'Cane Sugar', 'Lemon Juice'],
		inStock: true,
		featured: false,
		offer: { discount: 10, label: '10% OFF' },
		image: '/products/strawberry-jam.jpg',
		rating: 4.5,
		bio: true
	},
	{
		id: 5,
		name: 'Makdous',
		slug: 'makdous',
		description: 'Stuffed baby eggplants preserved in olive oil with walnuts, red peppers, and garlic. A beloved Lebanese breakfast staple.',
		category: 'Pickles & Olives',
		price: 16.99,
		denomination: '900g',
		origin: 'South Lebanon',
		ingredients: ['Baby Eggplants', 'Walnuts', 'Red Peppers', 'Garlic', 'Olive Oil', 'Salt'],
		inStock: true,
		featured: true,
		offer: null,
		image: '/products/makdous.jpg',
		rating: 4.9,
		bio: true
	},
	{
		id: 6,
		name: 'Oak Honey',
		slug: 'oak-honey',
		description: 'Raw unfiltered oak honeydew honey harvested from mountain forests. Dark, robust, and mineral-rich with a malty sweetness.',
		category: 'Honey',
		price: 22.99,
		denomination: '450g',
		origin: 'Shouf Mountains',
		ingredients: ['100% Raw Oak Honeydew Honey'],
		inStock: true,
		featured: true,
		offer: null,
		image: '/products/oak-honey.jpg',
		rating: 5.0,
		bio: true
	},
	{
		id: 7,
		name: 'Balsamic Vinegar',
		slug: 'balsamic-vinegar',
		description: 'Aged Lebanese grape balsamic vinegar with a sweet, complex depth. Ideal for dressings, reductions, and finishing dishes.',
		category: 'Oils & Vinegars',
		price: 14.99,
		denomination: '250ml',
		origin: 'Mount Lebanon',
		ingredients: ['Organic Grape Must', 'Wine Vinegar'],
		inStock: false,
		featured: false,
		offer: null,
		image: '/products/balsamic-vinegar.jpg',
		rating: 4.6,
		bio: true
	},
	{
		id: 8,
		name: 'Spicy Olives',
		slug: 'spicy-olives',
		description: 'Hand-picked Lebanese green olives marinated in a spicy blend of chili, herbs, and lemon. A bold, flavorful mezze essential.',
		category: 'Pickles & Olives',
		price: 11.99,
		denomination: '500g',
		origin: 'Akkar',
		ingredients: ['Green Olives', 'Chili Flakes', 'Herbs', 'Lemon', 'Olive Oil', 'Salt'],
		inStock: true,
		featured: false,
		offer: { discount: 20, label: '20% OFF' },
		image: '/products/spicy-olives.jpg',
		rating: 4.4,
		bio: true
	}
];

export function getProductBySlug(slug) {
	return products.find(p => p.slug === slug);
}

export function getFeaturedProducts() {
	return products.filter(p => p.featured);
}

export function getProductsWithOffers() {
	return products.filter(p => p.offer);
}

export function getProductsByCategory(category) {
	if (category === 'All') return products;
	return products.filter(p => p.category === category);
}
