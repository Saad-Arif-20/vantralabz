# Deploying Vantralabz to vantralabz.com

This replaces the old `vantra-labz` Next.js + Prisma + MySQL app currently
running on the VPS with this static Vite build. Same server, same domain,
same Nginx + certbot setup already in place — only the `location /` block
changes, from proxying a Node process to serving static files directly.

No database, no Node process, no PM2 needed for this site going forward.

---

## 0. Back up the current site first

The live site has a real database behind it. Back it up before changing
anything, even though nothing below deletes it:

```bash
ssh root@YOUR_VPS_IP

mysqldump -u root -p vantra_labz | gzip > ~/vantra_labz_backup_$(date +%F).sql.gz
tar czf ~/vantra-labz-code-backup_$(date +%F).tar.gz -C /var/www vantra-labz
```

Download both to your own machine:

```bash
scp root@YOUR_VPS_IP:~/vantra_labz_backup_*.sql.gz .
scp root@YOUR_VPS_IP:~/vantra-labz-code-backup_*.tar.gz .
```

Nothing forces you to delete the old database or code afterward — leaving
them in place on the VPS costs nothing but disk space.

---

## 1. Build the new site locally

From this project:

```bash
npm run build
```

Produces `dist/` — the entire site, currently ~670KB total.

---

## 2. Upload the build to the VPS

First time only, create the target folder:

```bash
ssh root@YOUR_VPS_IP "mkdir -p /var/www/vantralabz-static"
```

Then upload:

```bash
scp -r dist/* root@YOUR_VPS_IP:/var/www/vantralabz-static
```

---

## 3. Stop the old Next.js app

```bash
ssh root@YOUR_VPS_IP
pm2 stop vantra-labz
pm2 delete vantra-labz
```

---

## 4. Point Nginx at the static files

Find the actual config file first — it may not be named exactly this:

```bash
ls /etc/nginx/sites-enabled/
```

Edit it (likely `/etc/nginx/sites-available/vantra-labz`). Certbot typically
maintains **two** server blocks — one for port 80 (redirects to HTTPS) and
one for port 443 (`listen 443 ssl;`). The port 443 block is the one that
actually serves traffic — replace its `location /` (and the whole proxy
setup) with:

```nginx
root /var/www/vantralabz-static;
index index.html;

location / {
    try_files $uri $uri/ /index.html;
}
```

Leave the `listen 443 ssl;`, `server_name`, and certbot-managed
`ssl_certificate` lines untouched — only the `root`/`location` content
source is changing.

---

## 5. Reload Nginx

```bash
nginx -t && systemctl reload nginx
```

`nginx -t` checks the config is valid before it reloads — if it reports an
error, fix that before reloading, don't skip the check.

---

## 6. Verify

Visit https://vantralabz.com — should show the new site. HTTPS keeps
working since certbot's certificate doesn't care what's being served.

---

## Redeploying after future changes

```bash
npm run build
scp -r dist/* root@YOUR_VPS_IP:/var/www/vantralabz-static
```

That's it — no restart, no build step on the server. Nginx serves whatever
is in that folder immediately.
