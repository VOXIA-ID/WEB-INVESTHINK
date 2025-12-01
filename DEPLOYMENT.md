# 🚀 Deployment Guide - INVESTHINK

Panduan lengkap untuk deploy website INVESTHINK ke berbagai platform hosting.

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan:

- [ ] Semua file HTML, CSS, JS sudah lengkap
- [ ] Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive di mobile, tablet, desktop
- [ ] Semua link berfungsi dengan baik
- [ ] Tidak ada console errors
- [ ] Image optimized (jika ada)
- [ ] Meta tags sudah lengkap

## 🌐 Deployment Options

### 1. GitHub Pages (Gratis & Mudah)

#### Langkah-langkah:

```bash
# 1. Initialize Git repository
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit - INVESTHINK website"

# 4. Create repository di GitHub (investhink)

# 5. Add remote
git remote add origin https://github.com/username/investhink.git

# 6. Push ke GitHub
git branch -M main
git push -u origin main

# 7. Enable GitHub Pages
# Settings > Pages > Source: main branch > Save
```

**URL**: `https://username.github.io/investhink/`

**Kelebihan**:
- ✅ Gratis selamanya
- ✅ SSL otomatis
- ✅ Deploy otomatis saat push
- ✅ Custom domain support

**Kekurangan**:
- ❌ Public repository (kecuali pro)
- ❌ Hanya static content

---

### 2. Netlify (Recommended)

#### Langkah-langkah:

1. **Via Git (Recommended)**:
   ```bash
   # Push ke GitHub dulu (lihat cara di atas)
   
   # Kemudian:
   # 1. Login ke netlify.com
   # 2. New site from Git
   # 3. Connect to GitHub
   # 4. Select repository
   # 5. Deploy!
   ```

2. **Via Drag & Drop**:
   - Login ke netlify.com
   - Drag folder website ke area deploy
   - Website langsung live!

**URL**: `https://investhink.netlify.app/` (bisa custom)

**Kelebihan**:
- ✅ Gratis dengan batas generous
- ✅ Auto SSL
- ✅ Instant rollback
- ✅ Form handling
- ✅ Serverless functions
- ✅ Custom domain gratis

**Kekurangan**:
- ❌ Bandwidth limit (100GB/bulan free tier)

#### netlify.toml (Optional)

```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

### 3. Vercel

#### Langkah-langkah:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# Follow prompts dan selesai!
```

**URL**: `https://investhink.vercel.app/`

**Kelebihan**:
- ✅ Super cepat (Edge Network)
- ✅ Zero config
- ✅ Preview deployments
- ✅ Analytics built-in

---

### 4. Firebase Hosting

#### Langkah-langkah:

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# 4. Deploy
firebase deploy
```

**firebase.json**:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Kelebihan**:
- ✅ CDN global
- ✅ SSL gratis
- ✅ Custom domain

---

### 5. Surge.sh (Simple & Quick)

```bash
# 1. Install
npm install -g surge

# 2. Deploy
surge

# Enter domain: investhink.surge.sh
```

**Kelebihan**:
- ✅ Super simple
- ✅ Instant deployment
- ✅ Custom domain

---

## 🔧 Optimization Sebelum Deploy

### 1. Minify CSS

```bash
# Install cssnano
npm install -g cssnano-cli

# Minify
cssnano styles.css styles.min.css
```

Update di HTML:
```html
<link rel="stylesheet" href="styles.min.css">
```

### 2. Minify JavaScript

```bash
# Install terser
npm install -g terser

# Minify
terser script.js -o script.min.js -c -m
```

Update di HTML:
```html
<script src="script.min.js"></script>
```

### 3. Optimize Images (jika ada)

```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize
imagemin images/*.png --out-dir=images/optimized
```

### 4. Add Meta Tags

Tambahkan di `<head>` semua file HTML:

```html
<!-- SEO Meta Tags -->
<meta name="description" content="INVESTHINK - Platform trading kripto dengan AI untuk investor Indonesia. Analisis crypto real-time, screener, dan tools lengkap.">
<meta name="keywords" content="crypto, bitcoin, ethereum, trading, AI, Indonesia">
<meta name="author" content="INVESTHINK">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="INVESTHINK - AI-Powered Crypto Trading Platform">
<meta property="og:description" content="Platform trading kripto dengan teknologi AI terdepan">
<meta property="og:image" content="https://investhink.com/og-image.png">
<meta property="og:url" content="https://investhink.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="INVESTHINK - AI Crypto Trading">
<meta name="twitter:description" content="Platform trading kripto dengan AI">
<meta name="twitter:image" content="https://investhink.com/twitter-image.png">

<!-- Favicon -->
<link rel="icon" type="image/png" href="favicon.png">
```

## 📊 Analytics Setup

### Google Analytics

Tambahkan sebelum `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Microsoft Clarity

```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

## 🔒 Security Headers

Tambahkan di hosting config atau `.htaccess`:

```apache
# .htaccess untuk Apache
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

## 🌍 Custom Domain Setup

### 1. Beli Domain
- Namecheap
- GoDaddy
- Niagahoster (Indonesia)
- Dewaweb (Indonesia)

### 2. Configure DNS

**Untuk Netlify**:
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     investhink.netlify.app
```

**Untuk Vercel**:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Untuk GitHub Pages**:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     username.github.io
```

### 3. SSL Certificate
- Semua platform modern provide SSL gratis
- Auto-enable setelah domain connected
- Tunggu 5-10 menit untuk propagation

## 📈 Performance Monitoring

### 1. Google PageSpeed Insights
```
https://pagespeed.web.dev/
```

Target Score:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 2. GTmetrix
```
https://gtmetrix.com/
```

### 3. WebPageTest
```
https://www.webpagetest.org/
```

## 🔄 CI/CD Setup (Advanced)

### GitHub Actions

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## 📱 PWA Configuration (Optional)

### manifest.json

```json
{
  "name": "INVESTHINK",
  "short_name": "INVESTHINK",
  "description": "AI-Powered Crypto Trading Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#3B82F6",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Tambahkan di `<head>`:
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#3B82F6">
```

### Service Worker (sw.js)

```javascript
const CACHE_NAME = 'investhink-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/pricing.html',
  '/api.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register di script.js:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 🐛 Common Issues & Solutions

### Issue: CSS tidak load
**Solution**: Periksa path relatif, pastikan case-sensitive

### Issue: 404 pada refresh
**Solution**: Configure redirect rules di hosting

### Issue: Slow loading
**Solution**: Minify files, optimize images, enable caching

### Issue: Mixed content warning
**Solution**: Pastikan semua assets load via HTTPS

## 📞 Post-Deployment

### 1. Submit to Google
```
https://search.google.com/search-console
```

### 2. Create Sitemap
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://investhink.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://investhink.com/pricing.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://investhink.com/api.html</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. robots.txt
```
User-agent: *
Allow: /

Sitemap: https://investhink.com/sitemap.xml
```

## ✅ Final Checklist

- [ ] Website deployed dan accessible
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics setup dan tracking
- [ ] SEO meta tags lengkap
- [ ] Sitemap submitted ke Google
- [ ] Performance score >90
- [ ] Mobile responsive tested
- [ ] All links working
- [ ] Contact forms working (if any)

---

**Selamat! Website INVESTHINK sudah live! 🎉**

Jika ada pertanyaan atau issue, silakan buat issue di repository atau contact support.
