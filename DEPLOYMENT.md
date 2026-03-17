# Deployment

This project is set up as a static website for `orlandoqazaqtary.org`.

This site should live in its own GitHub repository (separate from Swallowtail).

## Files that get deployed

- `index.html`
- `OQ_logo_clean_social_1024_recolored.png`
- any other static assets in the repository root

`OQorg.html` is kept as a working copy, but `index.html` is the production homepage.

## Hostinger setup

1. In Hostinger hPanel, make sure the domain `orlandoqazaqtary.org` points to the website you want to use.
2. Confirm that the document root is `public_html`.
3. Open `Files` -> `FTP Accounts` and copy:
   - FTP host
   - FTP username
   - FTP password

## Hostinger VPS setup (recommended for VPS)

If you are using a Hostinger VPS (Linux server), deploy via SSH and serve the site with Nginx.

### 0) Domain DNS

In your domain DNS (Hostinger or wherever the DNS is hosted):

- Ensure `orlandoqazaqtary.org` has an `A` record pointing to your VPS public IP.
- Ensure `www.orlandoqazaqtary.org` also points to the VPS (either `A` record or `CNAME` to apex).

### 1) VPS prerequisites

- An Ubuntu/Debian VPS with Nginx installed.
- A deploy user (recommended) with SSH access (non-root).
- A web root directory that Nginx will serve (defaults to `/var/www/orlandoqazaqtary.org/public`).

The GitHub Actions VPS workflow in this repo is aligned with the Swallowtail pipeline style and uses the same `HOSTINGER_*` secrets.

Example VPS commands (run on the server):

- Install Nginx: `sudo apt-get update && sudo apt-get install -y nginx`
- Create deploy directory:
   - `sudo mkdir -p /var/www/orlandoqazaqtary.org/public`
   - `sudo chown -R $USER:www-data /var/www/orlandoqazaqtary.org`
   - `sudo chmod -R 755 /var/www/orlandoqazaqtary.org`

### 2) Nginx site config

Create `/etc/nginx/sites-available/orlandoqazaqtary.org`:

```nginx
server {
   listen 80;
   server_name orlandoqazaqtary.org www.orlandoqazaqtary.org;

   root /var/www/orlandoqazaqtary.org/public;
   index index.html;

   location / {
      try_files $uri $uri/ =404;
   }
}
```

Enable it:

- `sudo ln -sf /etc/nginx/sites-available/orlandoqazaqtary.org /etc/nginx/sites-enabled/orlandoqazaqtary.org`
- `sudo nginx -t && sudo systemctl reload nginx`

Optional (recommended): add TLS with Certbot.

### 3) SSH key for GitHub Actions

Generate an SSH keypair (locally) and add the **public** key to the deploy user’s `~/.ssh/authorized_keys` on the VPS.

GitHub Actions needs the **private** key as a secret (`HOSTINGER_SSH_KEY`).

For this repo’s VPS workflow, the secret name is `HOSTINGER_SSH_KEY` (matching the Swallowtail pipeline).

## GitHub repository secrets

In GitHub, open `Settings` -> `Secrets and variables` -> `Actions` and add:

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`

For VPS deploy (SSH), add these secrets:

- `HOSTINGER_HOST` (VPS hostname/IP: `srv521287.hstgr.cloud` / `77.37.86.202`)
- `HOSTINGER_USER` (SSH username, example: `root` or `deploy`)
- `HOSTINGER_PORT` (usually `22`)
- `HOSTINGER_SSH_KEY` (private key contents, PEM/OpenSSH)

Note: in the Swallowtail Root SPA pipeline, the VPS IP/hostname is also provided via the `HOSTINGER_HOST` GitHub Actions secret (it is not embedded in the workflow YAML). To reuse the same VPS, copy the value of `HOSTINGER_HOST` from the Swallowtail repo’s Actions secrets into this repo.

Optional:

- `OQORG_REMOTE_DIR` (defaults to `/var/www/orlandoqazaqtary.org/public`)

VPS reference:

- Hostinger plan: KVM 2
- Hostname: `srv521287.hstgr.cloud`
- IPv4: `77.37.86.202`

The workflow currently deploys to:

- FTP port: `21`
- remote directory: `/public_html/`

If your Hostinger setup uses a different directory, update `.github/workflows/deploy-hostinger.yml`.

For VPS deploy, the workflow is `.github/workflows/deploy-hostinger-vps.yml`.

Important behavior: the VPS workflow publishes `OQorg.html` as the live `index.html`.

## Deployment flow

1. Push this project to GitHub.
2. Set the default branch to `main`, or change the workflow trigger if you use another branch.
3. Add the three GitHub secrets listed above.
4. Push to `main`.
5. GitHub Actions uploads the static files to Hostinger automatically.

For VPS:

1. Push this project to GitHub.
2. Add the VPS secrets listed above.
3. Push to `main`.
4. GitHub Actions uploads a deploy bundle to the VPS via SCP to `/var/www/orlandoqazaqtary.org/public`.

If you set `OQORG_REMOTE_DIR`, the workflow deploys to that directory instead.

## New repo requirement

Create a dedicated GitHub repository for this site and push this folder to it.

Suggested steps:

1. Create a new repo on GitHub (example name: `OQ-org-site`).
2. In this folder, commit and push to `main`.
3. Add the `HOSTINGER_*` secrets to that new repo.
4. Push updates to `main` to deploy.

## VS Code workflow

The CI/CD loop from VS Code is:

1. Edit locally in VS Code.
2. Commit and push to GitHub.
3. GitHub Actions deploys to Hostinger.

No local build step is required for the current static setup.

## Service integration placeholders

This site is ready for static-service integrations such as:

- donations via Stripe Payment Links, Zeffy, or PayPal
- registrations via Tally, Jotform, or Google Forms
- newsletter signup via Brevo or Mailchimp

The public service links are configured at the bottom of `index.html` in:

- `OQ_SITE_LINKS.donate`
- `OQ_SITE_LINKS.registration`
- `OQ_SITE_LINKS.volunteer`
- `OQ_SITE_LINKS.newsletter`

Replace those placeholder URLs with your real public links.

## Important note about secrets

I cannot know or generate your actual Hostinger or GitHub credentials.

You must add your own real values for:

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`

For the donation, registration, volunteer, and newsletter tools, the website only needs the final public URLs, not private API keys.
