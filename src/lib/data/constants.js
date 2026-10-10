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

// Checkout
export const DELIVERY_FEE = 4; // flat, everywhere in Lebanon
export const WHISH_NUMBER = '76 851 555';
export const ORDER_EMAIL = 'egalakiki@gmail.com';
export const WHATSAPP_NUMBER = '96176851555'; // orders + customer contact

// Optional integrations — fill these in to activate:
// A payment link created in the owner's Whish app (Share > copy link).
// When set, the checkout shows a one-tap "Pay with Whish" button.
export const WHISH_PAYMENT_LINK = '';
// CallMeBot personal API key for automatic WhatsApp "new order" alerts
// to the owner's phone (one-time free setup at callmebot.com).
export const CALLMEBOT_APIKEY = '';

// SEO
export const SITE_URL = 'https://duniatylb.com';
export const SITE_NAME = 'Duniaty by Dunia';
export const INSTAGRAM_URL = 'https://www.instagram.com/duniaty.lb/';
export const CONTACT_PHONE = '+961 76 851 555';
