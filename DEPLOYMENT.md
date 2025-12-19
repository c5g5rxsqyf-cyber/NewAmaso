# Deployment (Static + Contact Email API)

This project is a static Vite build served by Nginx, plus a small Node.js API for the contact form (`POST /api/contact`).

## 1) Build + publish static site

```bash
cd /opt/NewAmaso
npm ci
npm run build
sudo mkdir -p /var/www/amaso
sudo rsync -av --delete dist/ /var/www/amaso/
```

## 2) Configure environment for the contact API

Create `/opt/NewAmaso/.env` (or export env vars another way):

```bash
EMAIL_TRANSPORT=smtp
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_USER=info@amaso.nl
SMTP_PASS=your_smtp_password
CONTACT_TO=info@amaso.nl
SMTP_FROM=AMASO Website <info@amaso.nl>
AUTO_REPLY_ENABLED=1
AUTO_REPLY_FROM=AMASO <info@amaso.nl>
AUTO_REPLY_SUBJECT=We received your message — AMASO
BRAND_NAME=AMASO
BRAND_WEBSITE=https://amaso.nl
BRAND_SUPPORT_EMAIL=info@amaso.nl
PORT=3001
```

## 3) Run the contact API (systemd)

Create `/etc/systemd/system/amaso-contact-api.service`:

```ini
[Unit]
Description=AMASO Contact API
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/NewAmaso
EnvironmentFile=/opt/NewAmaso/.env
ExecStart=/usr/bin/node /opt/NewAmaso/server/index.js
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
```

Enable + start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now amaso-contact-api
sudo systemctl status amaso-contact-api --no-pager
```

## 4) Nginx config (static + /api proxy)

In your server block for `amaso.nl`, add a proxy for `/api/`:

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:3001;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

The rest of the site stays static with SPA fallback:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```
