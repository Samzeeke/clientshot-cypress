import LoginPage from "../pages/LoginPage";

/**
 * Logs in through the real UI (per test, no session caching) using
 * credentials from cypress.env.json. Safe default for a read-only
 * production smoke suite.
 */
Cypress.Commands.add("loginAsQaUser", () => {
  const email = Cypress.env("qaUserEmail");
  const password = Cypress.env("qaUserPassword");

  if (!email || !password) {
    throw new Error(
      "Missing qaUserEmail / qaUserPassword. Set them in cypress.env.json."
    );
  }

  LoginPage.visit();
  LoginPage.login(email, password);
  LoginPage.assertLoginSucceeded();
});
