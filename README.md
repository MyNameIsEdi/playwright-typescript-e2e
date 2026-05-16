
# 🎭 Tests Repository 

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)
[![Playwright Tests](https://github.com/MyNameIsEdi/tests_repository/actions/workflows/playwright.yml/badge.svg)](https://github.com/MyNameIsEdi/tests_repository/actions)

A production-grade End-to-End testing framework built with **Playwright** and **TypeScript**, testing a real e-commerce demo site (Saucedemo). Demonstrates industry best practices including the **Page Object Model**, shared **auth fixtures**, centralized **test data**, and a full **CI/CD pipeline**.

---

## 🚀 Features

- **Page Object Model (POM)**  UI logic fully separated from test scripts across 4 page classes.
- **Auth Fixture**  Extends Playwright's built-in `page` fixture to provide a pre-authenticated browser, eliminating login boilerplate in every test.
- **Centralized Test Data**  All credentials, URLs, and constants live in one file; no magic strings in tests.
- **Full E2E Coverage**  Authentication, product sorting, cart management, and complete checkout flow.
- **Multi-browser Support**  Tests run concurrently across Chromium, Firefox, and WebKit.
- **GitHub Actions CI**  Automatic execution on every push and pull request.
- **HTML Report + Traces**  Screenshots, videos, and Playwright traces captured automatically on failure for quick debugging.

---

## 📝 Test Scenarios

| Suite | Tests |
|---|---|
| **Authentication** | Valid login, locked-out user error, invalid credentials error, form visibility |
| **Inventory** | Product count, sort by name A→Z / Z→A, sort by price low→high / high→low, empty cart badge |
| **Cart** | Badge increment, multi-item add, badge removal, item appears in cart, remove from cart page, continue shopping |
| **Checkout** | Full purchase flow (add → cart → shipping → overview → confirmation), empty form validation, order overview item check, cancel returns to cart |

---

## 🗂️ Project Structure

```text
├── .github/workflows/      # GitHub Actions CI pipeline
├── fixtures/
│   └── auth.fixture.ts     # Pre-authenticated page fixture
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── inventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                  # Test suites
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── utils/
│   └── test-data.ts        # Shared credentials, URLs, constants
├── playwright.config.ts    # Global Playwright configuration
└── package.json

```

---

## 💻 How to Run Locally

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)

### 1. Install dependencies

```bash
npm install

```

### 2. Install Playwright browsers

```bash
npx playwright install --with-deps

```

---

## 🧪 Running Tests

You can use the following scripts defined in `package.json`:

```bash
# All tests, all browsers (headless)
npm test

# Interactive UI mode  great for debugging
npm run test:ui

# Watch the browser (headed mode)
npm run test:headed

# Run on a single browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run a specific test suite
npm run test:login
npm run test:inventory
npm run test:cart
npm run test:checkout

# Open HTML report after a run
npm run report

```

---

## 🤖 Continuous Integration

Every push to `main` and every pull request triggers the GitHub Actions pipeline, which automatically:

1. Installs Node.js and handles dependency caching.
2. Installs Playwright browsers along with required system dependencies.
3. Runs the complete test suite in headless mode across all targeted browsers.
4. Uploads the HTML report and failure traces as a 30-day build artifact if any test fails.

---
</div>
