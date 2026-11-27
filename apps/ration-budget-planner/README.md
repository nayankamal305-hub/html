# Ration Budget Planner

A mobile-friendly, offline-first household grocery budget planner for Indian users.

## Features
- Set a monthly budget in INR.
- Add grocery items with quantity, price per unit, and category.
- Live planned total and remaining budget.
- Category-wise spend summary.
- Local browser storage only; no login, backend, analytics, or network requests.
- Responsive layout for phones and laptops.

## Stack
- Semantic HTML
- CSS
- Vanilla JavaScript ES modules
- Browser localStorage
- Node.js built-in assertions for calculator tests

## Local setup
From the repository root:

```bash
cd apps/ration-budget-planner
python -m http.server 8000
```

Open http://localhost:8000 in a browser. ES modules should be served over HTTP instead of double-clicking the HTML file.

## Tests
```bash
npm test
```

Expected output: `4 calculator checks passed`.

## Privacy and limitations
All data stays in the current browser's localStorage. Clearing site data or using another device will remove or hide the data. This is a planning helper, not accounting software.

## Deployment
The app is designed for static hosting such as GitHub Pages. A workflow can publish the folder once Pages is enabled for the repository. This contribution does not include secrets or server-side code.