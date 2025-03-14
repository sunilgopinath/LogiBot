# LogiBot

LogiBot is a logistics assistant built to handle natural language queries for shipment tracking and (future) route optimization. It features a TypeScript-based backend with Express, a React/TypeScript frontend styled with Tailwind CSS, and a robust test suite including unit and end-to-end (E2E) tests.

## Features
- **Shipment Tracking**: Query shipment status (e.g., "Where is shipment #123?") with mock data.
- **Natural Language Interface**: Simple parsing of user queries.
- **Responsive UI**: Clean, Tailwind-styled frontend.
- **Testing**: Thorough unit tests (Jest) and E2E tests (Cypress).

## Tech Stack
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Tailwind CSS
- **Testing**: Jest (unit), Cypress (E2E)
- **Dev Tools**: Nodemon, Concurrently, Wait-on

## Prerequisites
- Node.js (v20.13.1 or later recommended)
- npm (v10.x.x or later)

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/sunilgopinath/LogiBot
cd LogiBot
```

## Install Dependencies

### Backend (root):
```bash
npm install
```

### Frontend (client):
```bash
cd client
npm install
cd ..
```

## Start the Application

Manually (in separate terminals):

### Backend:
```bash
npm run dev
```

Runs on http://localhost:5000

### Frontend:
```bash
cd client
npm start
```

Runs on http://localhost:3001 (proxies API calls to 5000)

### Automated (single command):

```bash
cd client
npm run e2e
```

Starts backend, frontend, and runs E2E tests, then exits.

## Running Tests

### Backend Unit Tests

In logibot (root):

```bash
npm test
```

Tests API logic for /api/query (3 passing).

### Frontend Unit Tests

In client:
```bash
npm test

Tests React component rendering (2 passing).
```

### End-to-End (E2E) Tests
In client (with servers running):

```bash
npm run cy:run
```

Or automated:

```bash
npm run e2e
```
Tests full app flow (3 passing).


## Usage

1. Open http://localhost:3001 in your browser.

2. Enter a query in the input field:
   1. Shipment Tracking: "Where is shipment #123?"
      1. Output: "Shipment #123, Status: In Transit, Location: Chicago, ETA: March 16, 2025"
   2. Invalid Shipment: "Where is shipment #999?"
      1. Output: "Shipment #999 not found"
   3. General Query: "Hello"
      1. Output: "You asked: Hello"

## Project Structure

`logibot/`: Backend (Node.js/Express/TypeScript)
- `src/index.ts`: API server
- `src/index.test.ts`: Unit tests

`logibot/client/`: Frontend (React/TypeScript)
- `src/App.tsx`: Main component
- `src/App.test.tsx`: Unit tests
- `cypress/e2e/logibot.cy.ts`: E2E tests

## Future Improvements

- Add route optimization (e.g., "Optimize route from SF to LA").
- Integrate a real database (e.g., PostgreSQL) for shipments.
- Enhance natural language parsing with AI (e.g., intent recognition).

## Troubleshooting

- Port Conflicts: Adjust PORT in client/package.json or port in index.ts if needed.
- Network Issues: Ensure stable internet for npm installs (e.g., retry npm install --save-dev wait-on).
- Test Failures: Check server logs or Cypress screenshots in client/cypress/screenshots.

