# OQ.org (Orlando Qazaqtary)

Static site for `orlandoqazaqtary.org`.

This folder is intended to live in its **own GitHub repository** and deploy to a Hostinger VPS via GitHub Actions (SSH/SCP), using the same `HOSTINGER_*` secrets pattern as the Swallowtail pipeline.

## Deploy (Hostinger VPS)

- Workflow: `.github/workflows/deploy-hostinger-vps.yml`
- Source: `OQorg.html`
- Live file on VPS: `index.html`

### Required GitHub Actions secrets

- `HOSTINGER_HOST` (set to `srv521287.hstgr.cloud` or `77.37.86.202`)
- `HOSTINGER_USER`
- `HOSTINGER_PORT` (optional; default `22`)
- `HOSTINGER_SSH_KEY`

Optional:

- `OQORG_REMOTE_DIR` (default: `/var/www/orlandoqazaqtary.org/public`)

### One-time VPS setup (high level)

- Point DNS `A` records for `orlandoqazaqtary.org` / `www` to the VPS IP.
- Configure Nginx `server_name orlandoqazaqtary.org www.orlandoqazaqtary.org`.
- Set Nginx `root` to the same directory as `OQORG_REMOTE_DIR`.

See `DEPLOYMENT.md` for the full checklist.

## Payments

The Orlando Qazaqtary donate buttons are set up for a hosted payment link pattern.

Recommended option:

- Stripe Payment Link

Setup guide:

- `PAYMENT_SETUP.md`

## Create the new GitHub repo + push

From this folder:

```bash
git status
git add -A
git commit -m "Initial OQ.org site"

git branch -M main
git remote add origin <YOUR_GITHUB_REPO_SSH_OR_HTTPS_URL>
git push -u origin main
```

Then add the secrets in GitHub:

Repo → Settings → Secrets and variables → Actions.

## Notes

- The legacy FTP workflow exists but is manual-only: `.github/workflows/deploy-hostinger.yml`.
