# 📖 Panduan Lengkap Website INVESTHINK

## 🎯 Tentang INVESTHINK

INVESTHINK adalah platform trading cryptocurrency berbasis AI yang dirancang khusus untuk pasar Indonesia. Website ini adalah clone dari Invezgo.com yang telah disesuaikan untuk fokus pada transaksi kripto.

## 📂 Struktur Website

```
INVESTHINK/
├── index.html          # Halaman utama
├── pricing.html        # Halaman paket harga
├── api.html           # Dokumentasi API
├── styles.css         # File styling CSS
├── script.js          # JavaScript interaktif
├── README.md          # Dokumentasi teknis
├── PANDUAN.md         # Panduan ini
└── templates/         # Screenshot referensi
```

## 🚀 Cara Membuka Website

### Metode 1: Browser Langsung
1. Double-click file `index.html`
2. Website akan terbuka di browser default Anda

### Metode 2: Live Server (Recommended)
1. Install extension Live Server di VS Code
2. Right-click pada `index.html`
3. Pilih "Open with Live Server"
4. Website akan auto-reload saat ada perubahan

### Metode 3: Python Server
```bash
# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

## 🎨 Fitur Website

### 1. **Hero Section**
- Judul besar dengan animasi gradient
- Badge "AI Investment Manager"
- CTA button "Get Started"
- Preview chat AI interface

### 2. **Partners Section**
- Logo 6 exchange kripto terkemuka
- Binance, Coinbase, Kraken, dll

### 3. **Features Section (9 Fitur)**

#### a. Crypto Screener
- Tabel cryptocurrency dengan filter
- Tab switching (Top Gainer, Loser, Volume, dll)
- Data real-time (simulasi)

#### b. AI Analysis
- Analisis AI untuk kripto
- Visualisasi candlestick chart
- Rekomendasi trading

#### c. AI Assistant
- Chat interface untuk bertanya
- Support analisis teknikal
- Data mode quota

#### d. Custom GPT
- Integrasi dengan GPT apps
- List GPT templates
- No quota limit

#### e. Workspace
- Tools analisis lengkap
- Key statistics & Broker summary
- Customizable layout

#### f. Hotkey Navigation
- Keyboard shortcuts
- Quick crypto switching
- Mobile swipe support

#### g. Watchlist
- Track crypto favorit
- Buat catatan analisis
- Monitor performance

#### h. Auto Update
- Analisis otomatis harian
- Notifikasi WhatsApp/Telegram
- Real-time alerts

#### i. AI Chat Integration
- Integrasi dengan chat apps
- Multi-platform support
- Real-time consultation

### 4. **Testimonial Section**
- 6 testimonial cards
- Rating dan review pengguna
- Social proof

### 5. **Footer**
- Company info
- Quick links
- Social media links

## 📱 Halaman Tambahan

### Pricing Page (`pricing.html`)
Tiga paket harga:

1. **Free Plan** (Rp 0/bulan)
   - 10 AI Analysis per hari
   - Basic Screener
   - 5 Watchlist slots
   - Community support

2. **Pro Plan** (Rp 299K/bulan) ⭐ MOST POPULAR
   - Unlimited AI Analysis
   - Advanced Screener
   - Unlimited Watchlist
   - Custom GPT Access
   - Auto Update
   - Priority support

3. **Enterprise Plan** (Custom)
   - Everything in Pro
   - API Access
   - White-label solution
   - 24/7 Premium support
   - Dedicated account manager

**FAQ Section** tersedia di halaman pricing

### API Documentation (`api.html`)
Dokumentasi lengkap API endpoints:

1. **GET /crypto/price/{symbol}**
   - Get harga dan market data

2. **POST /ai/analyze**
   - AI analysis untuk crypto
   - Technical indicators
   - Trading signals

3. **GET /screener**
   - Screen crypto berdasarkan kriteria
   - Custom filters

4. **POST /watchlist**
   - Manage watchlist
   - Set price alerts

**Rate Limits:**
- Free: 100 req/day
- Pro: 10,000 req/day
- Enterprise: Custom

## ⌨️ Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| `Ctrl/Cmd + →` | Next cryptocurrency |
| `Ctrl/Cmd + ←` | Previous cryptocurrency |
| Click anchor links | Smooth scroll ke section |

## 🎨 Customization Guide

### Mengubah Warna Brand

Edit file `styles.css` di bagian `:root`:

```css
:root {
    --accent-blue: #3B82F6;      /* Warna utama */
    --accent-blue-hover: #2563EB; /* Hover state */
    --bg-primary: #000000;        /* Background */
    --text-primary: #ffffff;      /* Teks utama */
}
```

### Menambah Cryptocurrency

Edit file `script.js` di array `cryptos`:

```javascript
const cryptos = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'DOT', 'MATIC', 'LINK'];
```

### Mengubah Testimonial

Edit file `index.html` di section testimonial:

```html
<div class="testimonial-card">
    <div class="testimonial-header">
        <div class="testimonial-avatar">I</div>
        <div class="testimonial-author">
            <div class="testimonial-name">Nama Anda</div>
            <div class="testimonial-username">@username</div>
        </div>
    </div>
    <div class="testimonial-text">
        Testimonial Anda di sini...
    </div>
</div>
```

### Menambah Partner Exchange

Edit file `index.html` di partners section:

```html
<div class="partner-logo">Nama Exchange</div>
```

## 🎭 Theme Toggle

Website support dark/light mode:

1. Click icon ☀️/🌙 di navbar
2. Theme akan otomatis switch
3. Preference disimpan di session

## 📊 Interactive Features

### 1. Smooth Scrolling
- Semua anchor link scroll dengan smooth
- Otomatis ke target section

### 2. Tab Switching
- Click tab untuk filter crypto
- Active state indicator
- Smooth transition

### 3. Toast Notifications
- Muncul di bottom-right
- Auto-hide setelah 3 detik
- Sliding animation

### 4. Intersection Observer
- Fade-in animation saat scroll
- Trigger saat element terlihat
- Smooth entrance effect

### 5. Parallax Effect
- Hero section parallax saat scroll
- Opacity fade out
- Depth illusion

### 6. Price Updates
- Update setiap 5 detik (simulasi)
- Random price change
- Real-time feeling

## 🔧 Browser Compatibility

Website kompatibel dengan:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Responsive Breakpoints

```css
Desktop:  > 1024px  (Full features)
Tablet:   768-1024px (Adjusted layout)
Mobile:   < 768px   (Mobile optimized)
Small:    < 480px   (Compact view)
```

## 🐛 Troubleshooting

### Website tidak muncul dengan baik?
1. Clear browser cache
2. Hard reload: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
3. Pastikan semua file (HTML, CSS, JS) ada dalam folder yang sama

### JavaScript tidak berjalan?
1. Check browser console (F12)
2. Pastikan `script.js` ter-load
3. Disable extension yang block JS

### Animasi tidak smooth?
1. Update browser ke versi terbaru
2. Enable hardware acceleration di browser settings
3. Close tab lain untuk free up memory

## 🎯 Best Practices

### Performance Optimization
1. Image optimization (gunakan WebP format)
2. Minify CSS & JS untuk production
3. Enable gzip compression di server
4. Use CDN untuk assets

### SEO Optimization
1. Tambahkan meta description
2. Optimize image alt text
3. Add structured data (JSON-LD)
4. Create sitemap.xml

### Accessibility
1. Maintain color contrast ratio
2. Add ARIA labels
3. Keyboard navigation support
4. Screen reader friendly

## 📈 Future Development

### Phase 1: Core Features
- [x] Landing page design
- [x] Responsive layout
- [x] Interactive features
- [x] Multi-page structure

### Phase 2: Backend Integration
- [ ] Real API integration
- [ ] User authentication
- [ ] Database setup
- [ ] Payment gateway

### Phase 3: Advanced Features
- [ ] Live trading functionality
- [ ] Real-time WebSocket data
- [ ] Advanced charting (TradingView)
- [ ] Portfolio management

### Phase 4: Mobile App
- [ ] React Native app
- [ ] iOS version
- [ ] Android version
- [ ] App store deployment

## 💡 Tips & Tricks

### Untuk Developer
1. **Use Browser DevTools** - Inspect element, check console
2. **Version Control** - Gunakan Git untuk track changes
3. **Code Comments** - Tambahkan comments untuk dokumentasi
4. **Testing** - Test di berbagai browser dan device

### Untuk Designer
1. **Consistent Spacing** - Gunakan 8px grid system
2. **Color Palette** - Stick to defined color scheme
3. **Typography** - Max 2-3 font families
4. **Animation** - Keep it subtle and purposeful

### Untuk Content Creator
1. **Clear Copy** - Tulis dengan jelas dan concise
2. **Value Proposition** - Highlight manfaat untuk user
3. **Call-to-Action** - Jelas dan compelling
4. **Social Proof** - Tambah testimonial dan stats

## 📞 Support & Contact

Jika ada pertanyaan atau butuh bantuan:

1. **Email**: support@investhink.com
2. **Discord**: INVESTHINK Community
3. **Twitter**: @investhink
4. **GitHub**: [Issues page]

## 📄 License & Credits

**Website**: © 2024 INVESTHINK. All rights reserved.

**Design Inspiration**: Invezgo.com

**Technologies Used**:
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- SVG Graphics

**Fonts**: System fonts (-apple-system, Segoe UI, etc.)

**Icons**: Custom SVG icons

---

**Dibuat dengan ❤️ untuk Komunitas Crypto Indonesia**

Selamat menggunakan INVESTHINK! 🚀
