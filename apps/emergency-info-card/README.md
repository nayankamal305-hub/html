# Emergency Info Card

A privacy-first, offline-friendly card for storing essential medical information and emergency contacts on a phone.

## Features
- Hindi-first, mobile-friendly UI
- Saves data locally in localStorage
- Validates name, blood group and primary contact
- Generates a clean emergency summary
- Uses Web Share where supported; otherwise copies a text summary
- Print-friendly summary
- No backend, login, analytics or external API

## Local setup
Serve the folder over HTTP because the app uses ES modules:

    python3 -m http.server 8000

Then open http://localhost:8000.

## Tests

    npm test

## Deployment
This is a static app. It can be deployed to GitHub Pages, Netlify, Vercel or any static host. Do not treat the GitHub branch URL as a live deployment URL unless the host is configured and the public page has been verified.

## Privacy and limitations
Data stays in the current browser profile. Clearing browser storage removes it. This app is not a medical record system and does not replace emergency services. For emergencies in India, call 112 or 108 as appropriate.