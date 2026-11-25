# UPI Suraksha Check

A small, mobile-friendly Hindi-first tool that checks pasted SMS, WhatsApp messages, and URLs for common UPI/social-engineering warning signs.

## Features

- Detects requests involving UPI PINs, OTPs, remote-access apps, urgent account threats, suspicious refunds/rewards, APK installs, and collect requests.
- Flags common shortened URLs, direct-IP links, and QR-code payment language.
- Explains practical next steps in simple Hindi/Hinglish.
- Runs entirely in the browser. No account, backend, analytics, or message storage.

## Run locally

No build step or dependencies are required. Because the app uses JavaScript modules, serve this folder over HTTP instead of opening the file directly. From this directory run `python -m http.server 8000`, then visit `http://localhost:8000`.

To run the rule tests with Node.js 18 or later:

```sh
npm test
```

## Safety and privacy

The app analyzes only text the user chooses to paste. It does not send text to a server or save it. Avoid pasting OTPs, UPI PINs, passwords, account numbers, or other sensitive information.

This is a basic heuristic, not a fraud detector or official verification service. It can miss scams and can flag harmless messages. A low-risk result does not prove a message or link is safe.

If money has been lost to cyber fraud in India, call **1930** promptly and report at [cybercrime.gov.in](https://cybercrime.gov.in/).

## Files

- `index.html` — accessible app interface
- `style.css` — responsive styles
- `app.js` — browser UI behavior
- `checker.js` — offline heuristic rules
- `checker.test.js` — Node test suite

## License

MIT