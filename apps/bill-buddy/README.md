# Bill Buddy

Offline-first Hindi tool for splitting a household electricity bill.

## Features
- Equal split or unit-weighted split.
- Fixed charge shared equally; variable charge follows usage.
- Mobile-friendly, copyable summary, no backend or analytics.

## Local setup
Serve over HTTP because the app uses ES modules:

    cd apps/bill-buddy
    python -m http.server 8000

Open http://localhost:8000.

## Test
    npm test

## Deployment
Static files can be deployed with GitHub Pages. This repository includes a workflow file for Pages deployment.