# ClientShot Cypress Regression Suite

Cypress + Page Object Model (POM) suite for post-deploy regression checks
on ClientShot (production, read-only).

## Setup

```bash
npm install
```

Credentials live in `cypress.env.json` (already gitignored — never commit
this file). It currently holds the QA production login:

```json
{
  "qaUserEmail": "sezekiel@seamhealth.com",
  "qaUserPassword": "Jojo@123"
}
```

If this suite is shared with the team or CI, rotate this password and pass
credentials as CI secrets / environment variables instead of committing a
real password to any file, even a gitignored one on a shared machine.

## Running

```bash
npm run cy:open          # interactive runner
npm run cy:run           # headless, full suite
npm run cy:run:smoke     # headless, smoke folder only
```

## Structure

```
cypress/
  e2e/
    smoke/
      login.cy.js         # fast canary: login only
      full-smoke.cy.js     # loops every page in NavPage.pages
  pages/
    BasePage.js            # shared helpers (visit, health check) — no selectors here
    LoginPage.js            # login form POM — TODO: real selectors
    NavPage.js               # registry of pages to smoke test — TODO: real page list
  support/
    commands.js              # cy.loginAsQaUser() custom command
    e2e.js                    # global config, uncaught exception handling
```

## What YOU need to fill in before this is real (2 things left)

1. ~~`cypress.config.js` baseUrl~~ — done: `https://app.clientshot.com`
2. **`cypress/pages/LoginPage.js`** — replace the placeholder selectors
   (`emailInput`, `passwordInput`, `submitButton`) with ClientShot's real
   ones, and fix `assertLoginSucceeded()` to check a real post-login
   signal (e.g. dashboard element or redirect path). Ask Damilare/dev
   team to add `data-testid` attributes to the login form and nav links
   if they don't already exist — it'll save you from rewriting selectors
   every time a class name changes.
3. **`cypress/pages/NavPage.js`** — replace the placeholder `pages` array
   with ClientShot's real page list (name + path + optional nav
   `data-testid`). Every entry you add gets a smoke test for free.

## Design notes

- **Read-only by design**: `cypress.config.js` sets `allowWrites: false`
  by default since this targets production. Don't add specs that create,
  edit, or delete real data unless you deliberately flip that flag and
  know what you're doing.
- **UI login every test**: no session caching, per your call — slower
  than API login/session injection, but it also exercises the real login
  form on every run, which doubles as auth regression coverage.
- **`assertPageHealthy()`** in `BasePage` is a generic "didn't 500/blow
  up" check. As you find ClientShot-specific things worth asserting per
  page (e.g. a specific widget always renders), add page-specific
  methods to that page's own POM class rather than bloating BasePage.

## Extending later

- Add a `cypress/pages/BuildsPage.js`, `UploadPage.js`, etc. as you need
  deeper (not just "does it load") coverage of specific features.
- Add `cypress/fixtures/` data files if/when tests need structured input.
- CI: this is ready to drop into a GitHub Actions workflow using
  `cypress-io/github-action` once you're ready — happy to add that
  workflow file when you want it.
