import BasePage from "./BasePage";

/**
 * NavPage
 * Registry of pages the smoke suite sweeps through. Paths below are
 * confirmed real ClientShot routes, sourced from the Katalon
 * recorder export (not placeholders anymore):
 *   /dashboard, /feedbacks/complaints, /feedbacks/responses,
 *   /user-management, /forms, /form-builder
 *
 * Add more routes here as you discover them — every entry gets a
 * smoke test for free via full-smoke.cy.js.
 */
class NavPage extends BasePage {
  pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Complaints", path: "/feedbacks/complaints" },
    { name: "Responses", path: "/feedbacks/responses" },
    { name: "User Management", path: "/user-management" },
    { name: "Forms", path: "/forms" },
  ];
}

export default new NavPage();
