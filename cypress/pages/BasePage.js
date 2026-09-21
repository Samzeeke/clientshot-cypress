/**
 * BasePage
 * Shared helpers every page object inherits. Keep selectors OUT of
 * this file — it's structural only, not app-specific.
 */
class BasePage {
  visit(path = "/") {
    cy.visit(path);
    return this;
  }

  get(selector) {
    return cy.get(selector);
  }

  getByTestId(testId) {
    return cy.get(`[data-testid="${testId}"]`);
  }

  containsText(text) {
    return cy.contains(text);
  }

  // Generic "page didn't blow up" check used across every smoke test:
  // page loaded, no error boundary/toast, body actually has content.
  assertPageHealthy() {
    cy.location("pathname", { timeout: 15000 }).should("not.be.empty");
    cy.get("body").should("be.visible").and("not.be.empty");
    cy.contains(/application error|something went wrong|500|404/i, {
      timeout: 2000,
    }).should("not.exist");
    return this;
  }
}

export default BasePage;
