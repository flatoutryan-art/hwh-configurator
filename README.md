# HWH Designs — Cabinet Configurator

Built-in cabinet configurator for HWH Designs. Configure kitchen and joinery layouts, materials, finishes, and fittings, then request a quote.

## Local Development

**Requirements:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server (opens at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deploy to Vercel

### Option A — GitHub + Vercel (recommended, auto-deploys on push)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — no settings needed
5. Click **Deploy**

Every future `git push` to `main` will auto-deploy.

### Option B — Vercel CLI (one-command deploy)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Done.

### Option C — Drag & Drop (no account needed)

```bash
npm run build
```

Then drag the `dist/` folder to [vercel.com/new](https://vercel.com/new) or [netlify.com/drop](https://app.netlify.com/drop).

## Project Structure

```
hwh-configurator/
├── index.html          # HTML entry point
├── vite.config.js      # Vite config
├── package.json        # Dependencies
├── .gitignore
└── src/
    ├── main.jsx        # React root mount
    └── App.jsx         # Full configurator app
```
