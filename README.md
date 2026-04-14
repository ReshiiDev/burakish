# Burakish Abaya — Website

Luxury Abaya boutique website for Madinat Zayed Shopping Centre, Abu Dhabi.

## 🚀 Deploy to Cloudflare Pages

### GitHub + Cloudflare Pages (recommended - auto-deploys on every push)
1. **Repository already pushed**: https://github.com/ReshiiDev/burakish
2. **Connect to Cloudflare Pages**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project** → **Connect to Git**
   - Authorize GitHub and select `ReshiiDev/burakish`
   - **Build settings**:
     - **Build command**: `npm run build` ✅
     - **Build output directory**: `/` (root) ✅
     - **Framework preset**: None ✅
     - **Deploy command**: (leave **EMPTY** - remove if auto-filled) ❌
   - Click **Save and Deploy**
3. ✅ Your site is live! Every push to `main` branch auto-deploys.

**Note**: This is a pure static HTML/CSS/JS site. Cloudflare Pages serves files directly from the root. Do NOT set a deploy command!

---

## 📁 File Structure

```
/
├── index.html          ← Main page
├── vercel.json         ← Vercel routing + headers config
├── package.json        ← Project metadata
├── css/
│   └── styles.css      ← All styles (variables, layout, components, responsive)
├── js/
│   ├── main.js         ← Orchestrator: init, nav, scroll reveal, hours
│   ├── loader.js       ← Page loading screen animation
│   ├── cursor.js       ← Custom luxury cursor
│   ├── canvas.js       ← Hero canvas particle / geometry animation
│   └── booking.js      ← Styling session form → WhatsApp
└── assets/
    └── og-image.svg    ← Open Graph / social preview image
```

---

## ✏️ Customisation Checklist

| Item | Location | What to change |
|------|----------|---------------|
| WhatsApp number | `js/booking.js` line 3 | Replace `971500000000` |
| Phone number | `index.html` mobile sticky footer | Replace `+971500000000` |
| Store hours | `js/main.js` `HOURS` object | Update days/times |
| Google Maps | `index.html` iframe `src` | Replace embed URL |
| Instagram handle | All `@burakish_abaya` links | If handle changes |
| OG title/description | `index.html` `<head>` meta tags | For social sharing |

---

## 🎨 Design Tokens (css/styles.css)

```css
--gold: #c9a96e       /* Primary brand gold */
--gold-lt: #e8d5a8    /* Hover / lighter gold */
--black: #080706      /* True background */
--text: #ede6d8       /* Body text */
--muted: #8c8070      /* Secondary text */
```

---

## 📸 Adding Real Photos

Replace the placeholder gradient cards in the gallery section with real images:

```html
<!-- In index.html, inside each .gallery-item, add: -->
<img src="/assets/abaya-noor.jpg" alt="Al Noor Classic Abaya" class="gi-photo">
```

```css
/* In css/styles.css */
.gi-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
```

Recommended image sizes: **800×1067px** (3:4 ratio) for portrait cards, **1200×600px** for wide cards.

---

Built with pure HTML, CSS & vanilla JS — zero dependencies, ultra-fast.
