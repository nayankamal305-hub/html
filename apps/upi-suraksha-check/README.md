# UPI Suraksha Check

A Hindi-first, mobile-friendly, offline-ready UPI scam awareness tool. It checks pasted SMS/WhatsApp text, URLs and payment requests for common warning patterns.

## Features
- Rule-based checks for OTP/PIN requests, fake KYC/account-block claims, urgency, suspicious links, APK/remote-access apps, refund and QR scams, and threats.
- Hindi and English interface.
- Risk bands with findings and practical next steps.
- Emergency actions: call **1930** and visit the National Cyber Crime Reporting Portal.
- Progressive Web App (PWA) with service-worker caching for repeat/offline use.
- No sign-in, analytics, server, API calls or data upload. The text is analysed locally in the browser.
- Responsive layout for Android phones and desktop browsers.

## Run locally
Serve this directory over HTTP (service workers require localhost or HTTPS):
```bash
python3 -m http.server 8080
``
Open http://localhost:8080/apps/upi-suraksha-check/ from the repository root, or serve this directory directly and open http://localhost:8080/.

## Safety and limitations
This is an educational, rule-based first-pass checker, **not** a bank, NPCI, police or government verification service. It does not query threat-intelligence feeds and cannot prove a URL, sender or payment request is safe. Scammers change wording; false positives and false negatives are possible. Never paste OTPs, UPI PINs, passwords, card details or other secrets into any checker. Verify requests independently using your bank's official app or contact channel.

If money has been lost, contact your bank immediately, call **1930**, and report at https://cybercrime.gov.in/.

## Tests
Run:
```bash
npm test
``

## Deploy with GitHub Pages
The repository workflow at `.github/workflows/pages.yml` deploys the repository root to GitHub Pages when changes reach `main`. In repository Settings → Pages, set **Build and deployment → Source: GitHub Actions** once. After the workflow succeeds, open:
`https://nayankamal305-hub.github.io/html/apps/upi-suraksha-check/`

## Official safety references
- RBI consumer warning on fake links, calls, QR codes, remote-access apps and UPI collect requests: https://rbi.org.in/Scripts/BS_PressReleasedisplay.aspx?prid=53185
- NPCI BHIM-UPI guidelines: https://www.npci.org.in/
- National Cyber Crime Reporting Portal: https://cybercrime.gov.in/
