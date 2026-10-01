import LoginPage from "../../pages/LoginPage";
import WorkspacePage from "../../pages/WorkspacePage";

describe("ClientShot — Login", () => {
  beforeEach(() => {
    // Deliberately bypass cy.session(): everywhere else in the suite
    // uses the cached session via cy.loginAsQaUser() for speed, but
    // this spec exists specifically to exercise the real login form
    // on every run, so a login-form regression doesn't go unnoticed
    // just because the rest of the suite never re-logs-in.
    Cypress.session.clearAllSavedSessions();
  });

  it("logs in successfully with valid QA production credentials", () => {
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

        cy.location("pathname", { timeout: 10000 }).should(
          "include",
          "/dashboard"
        );
      }
    );
  });
});