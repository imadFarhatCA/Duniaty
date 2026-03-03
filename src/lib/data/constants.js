export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Products', href: '/products' },
	{ label: 'About', href: '/about' }
];

export const trustBadges = [
	{ label: 'BIO Certified', icon: 'check' },
	{ label: '100% Organic', icon: 'shield' },
	{ label: 'From Lebanon', icon: 'pin' }
];

export const values = [
	{
		title: '100% Organic',
		description: 'Every ingredient is sourced from certified organic farms across Lebanon.',
		icon: 'shield'
	},
	{
		title: 'Made with Love',
		description: 'Small-batch production ensures quality and attention to every detail.',
		icon: 'heart'
	},
	{
		title: 'From Lebanon',
		description: 'Directly sourced from the finest regions — Bekaa, Shouf, Akkar, and beyond.',
		icon: 'globe'
	}
];

export function getDiscountedPrice(price, offer) {
	if (!offer) return null;
	return +(price * (1 - offer.discount / 100)).toFixed(2);
}
