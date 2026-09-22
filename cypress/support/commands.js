import LoginPage from "../pages/LoginPage";
import WorkspacePage from "../pages/WorkspacePage";

/**
 * Logs in through the real UI (per test, no session caching) using
 * credentials from cypress.env.json, then handles the workspace
 * picker if ClientShot shows one for this account. Safe default for
 * a read-only production smoke/regression suite.
 *
 * Uses cy.env() rather than the removed Cypress.env() (removed in
 * Cypress 16) — credentials are sensitive, so cy.env() is the right
 * choice: it only exposes the specific keys requested and keeps
 * everything else out of the browser context.
 */
Cypress.Commands.add("loginAsQaUser", () => {
  cy.env(["qaUserEmail", "qaUserPassword", "qaWorkspaceName"]).then(
    ({ qaUserEmail, qaUserPassword, qaWorkspaceName }) => {
      if (!qaUserEmail || !qaUserPassword) {
        throw new Error(
          "Missing qaUserEmail / qaUserPassword. Set them in cypress.env.json."
        );
      }

      LoginPage.visit();
      LoginPage.login(qaUserEmail, qaUserPassword);
      LoginPage.assertLoginSucceeded();

      if (qaWorkspaceName) {
        WorkspacePage.selectWorkspaceIfPresent(qaWorkspaceName);
      }

      cy.location("pathname", { timeout: 10000 }).should("include", "/dashboard");
    }
  );
});