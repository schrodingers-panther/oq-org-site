# Payment Setup

This site is already prepared for a hosted donation flow using a public payment link.

Recommended path:

- Stripe Payment Link

This is the fastest option because it does not require a backend, API keys in the site, or PCI-sensitive card handling in the browser.

## What the site expects

The donate buttons in `OQorg.html` read from:

- `OQ_SITE_LINKS.donate`

Once you have a public Stripe payment link, place it there and deploy.

Example shape:

```js
donate: "https://buy.stripe.com/your-live-payment-link"
```

## How to create the Stripe payment link

1. Log in to Stripe.
2. Go to `Payments` -> `Payment Links`.
3. Click `Create payment link`.
4. Create a product such as:
   - `Orlando Qazaqtary Donation`
5. Choose the amount model:
   - fixed amount, or
   - customer chooses amount
6. If Stripe offers it in your account, enable optional fields you want:
   - donor name
   - email
   - address
7. Add a success URL, for example:
   - `https://orlandoqazaqtary.org/?donation=success`
8. Publish the payment link.
9. Copy the public URL.

## Update the site

In `OQorg.html`, replace the placeholder value in `OQ_SITE_LINKS.donate` with the real Stripe payment link.

Then push to `main` so GitHub Actions deploys it.

## Notes

- The website should only contain the public hosted Stripe link.
- Do not place Stripe secret keys in the HTML.
- If you later want memberships, recurring donations, discount codes, or webhook-based confirmation, that is a separate backend integration.

## Wing Chun site

The Wing Chun standalone page currently does not expose any donation or checkout UI. If you want payments there too, first add a visible donation or checkout button, then use the same hosted-payment-link pattern.