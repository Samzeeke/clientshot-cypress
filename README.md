# ClientShot Cypress Regression Suite

Cypress + Page Object Model (POM) suite for post-deploy regression checks
on ClientShot (`https://app.clientshot.com`, production).

## Setup

```bash
npm install
```

Credentials live in `cypress.env.json` (gitignored — never commit this
file):

```json
{
  "qaUserEmail": "sezekiel@seamhealth.com",
  "qaUserPassword": "Jojo@123"
}
```

If ClientShot shows a workspace picker after login for this account, add:
```json
"qaWorkspaceName": "<the workspace name/initial to select>"
```
`cy.loginAsQaUser()` will select it automatically; if the field is absent
it assumes login drops straight into `/dashboard`.

Rotate this password if the suite is ever shared beyond this machine, and
use CI secrets rather than a committed file for any shared/CI run.

## Running

```bash
npm run cy:open               # interactive runner
npm run cy:run                # headless, everything
npm run cy:run:smoke          # smoke folder only
npm run cy:run:regression     # regression (module) folder only
```

Specs that create real data in production (inviting a user, creating a
form) are **skipped by default**. Run them explicitly with:
```bash
npx cypress run --env allowWrites=true
```

## Structure

```
cypress/
  e2e/
    smoke/
      login.cy.js                    # fast canary: login only
      full-smoke.cy.js               # loops every page in NavPage.pages
    regression/
      complaints-export.cy.js        # Module: Export Complaint
      responses-filter-export.cy.js  # Module: Filter & Export Response
      user-management.cy.js          # Module: User Management (invite gated)
      forms-create.cy.js             # Module: Create Forms (gated)
      public-survey-fill.cy.js       # Module: Demo Form Flow (public, no login)
      dashboard-analytics-export.cy.js  # Module: IHVN FCT (breakdown + LGA/Facility export)
  pages/
    BasePage.js              # shared helpers — no selectors here
    LoginPage.js              # login form
    WorkspacePage.js           # post-login workspace picker (conditional)
    DashboardPage.js            # sidebar nav (Feedback, Configurations, Forms)
    ComplaintsPage.js            # Feedback > Complaints > export
    ResponsesPage.js              # Feedback > Responses > filter/export/report
    UserManagementPage.js          # Configurations > User Management
    FormsPage.js                    # /forms list + new-form entry point
    FormBuilderPage.js               # question building inside a form
    PublicSurveyPage.js               # public respondent-facing survey flow
    DashboardAnalyticsPage.js          # respondent breakdown modal + LGA/Facility feedback filter
    NavPage.js                         # page registry for the smoke sweep
  support/
    commands.js               # cy.loginAsQaUser() — UI login + workspace select
    e2e.js                     # global config
```

## Where this suite came from

The module breakdown (Export Complaint, Filter & Export Response, User
Management, Create Forms, Demo Form Flow, IHVN FCT dashboard/export) and
every selector in the page objects above were converted from a real
Katalon Recorder export
(`PROD_REGRESSION_TEST_SUIT.krecorder`) captured against production. This
is a translation of an actual recorded regression pass, not a made-up
placeholder suite.

## Known gaps / hardening needed

Katalon Recorder selectors are relative-xpath and CSS-class based (e.g.
`button.primary`, deeply nested `div[5]/div/div/div/div/div/input`), which
is inherently brittle — they'll break on markup or styling changes that
have nothing to do with an actual regression. Priorities, roughly in
order:

1. **Ask dev to add `data-testid` attributes** to: login form fields,
   nav links, the Export/Filter/Save buttons, and form-builder question
   rows. This is the single highest-leverage fix — swap every selector
   marked `TODO` in the page objects once available.
2. **`WorkspacePage`** — confirm whether the workspace-picker screen is
   consistent for this account or conditional; the current
   `selectWorkspaceIfPresent()` handles both but a hard assertion would
   be more reliable once you know the real behavior.
3. **`ResponsesPage` test data** (`formId`, state/branch names in
   `responses-filter-export.cy.js`) — these came from the recorded
   session and may be stale; confirm against a current form.
4. **`public-survey-fill.cy.js`** — the demo flow slug (`TEST/FTQda1d7`)
   may expire; also, this spec hardcodes one specific question sequence
   (Yes/No → textarea → phone → email). Real forms vary, so treat this
   as a template to copy per form rather than a universal spec.

## Design notes

- **Read-only by default**: `cypress.config.js` sets `allowWrites: false`.
  Specs that write real data (invite a user, create a form) are gated
  with `Cypress.env('allowWrites')` and skipped unless explicitly enabled.
- **UI login every test**: no session caching, per your call — slower,
  but it exercises the real login form every run.
- **`BasePage.assertPageHealthy()`** is a generic "didn't 500/blow up"
  check used by the smoke sweep. Module-specific assertions live in each
  module's own regression spec instead.

## Extending

- Copy the pattern in `public-survey-fill.cy.js` for each additional
  client survey form you want covered.
- Add page objects for any module not yet covered (e.g. Analytics/IHVN
  dashboard breakdowns, Contacts, Commendations) the same way — one class
  per page/module, selectors sourced from a fresh recording if you have
  one.
- CI: ready to drop into a GitHub Actions workflow using
  `cypress-io/github-action` — say the word and I'll add the workflow file.
