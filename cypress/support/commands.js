import LoginPage from "../pages/LoginPage";

<<<<<<< HEAD
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
=======
Cypress.Commands.add("loginAsQaUser", () => {

    const email = Cypress.env("qaUserEmail");
    const password = Cypress.env("qaUserPassword");

    LoginPage.visit();

    LoginPage.login(
        email,
        password
    );

    LoginPage.assertLoginSucceeded();

});

Cypress.Commands.add("verifyNoErrorModal", () => {

    cy.get("body").then(($body) => {

        // Check common error modal selectors
        const errorSelectors = [
            ".error-modal",
            ".toast-error",
            ".alert-error",
            '[role="alert"]',
            '[data-testid="error-modal"]'
        ];

        errorSelectors.forEach((selector) => {
            if ($body.find(selector).length) {
                cy.get(selector).should("not.be.visible");
            }
        });

        // Check common error messages
        const bodyText = $body.text();

        expect(bodyText).not.to.include("Something went wrong");
        expect(bodyText).not.to.include("An error occurred");
        expect(bodyText).not.to.include("Internal Server Error");
        expect(bodyText).not.to.include("Request failed");
        expect(bodyText).not.to.include("Unexpected error");
    });

});
>>>>>>> b29760a (Add Cypress smoke test scripts)
