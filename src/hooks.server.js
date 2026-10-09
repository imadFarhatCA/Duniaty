// Redirect www.duniatylb.com -> duniatylb.com so every visitor uses the
// canonical host (matters for SEO and for the order-email form activation).
export function handle({ event, resolve }) {
	if (event.url.hostname === 'www.duniatylb.com') {
		return Response.redirect(`https://duniatylb.com${event.url.pathname}${event.url.search}`, 301);
	}
	return resolve(event);
}
