import LoginPage from "../pages/LoginPage";
import WorkspacePage from "../pages/WorkspacePage";

/**
 * Logs in through the real UI (per test, no session caching) using
 * credentials from cypress.env.json, then handles the workspace
 * picker if ClientShot shows one for this account. Safe default for
 * a read-only production smoke/regression suite.
 */
Cypress.Commands.add("loginAsQaUser", () => {
  const email = Cypress.env("qaUserEmail");
  const password = Cypress.env("qaUserPassword");
  const workspaceName = Cypress.env("qaWorkspaceName"); // optional, set in cypress.env.json if needed

  if (!email || !password) {
    throw new Error(
      "Missing qaUserEmail / qaUserPassword. Set them in cypress.env.json."
    );
  }

  LoginPage.visit();
  LoginPage.login(email, password);
  LoginPage.assertLoginSucceeded();

  if (workspaceName) {
    WorkspacePage.selectWorkspaceIfPresent(workspaceName);
  }

  cy.location("pathname", { timeout: 10000 }).should("include", "/dashboard");
});
