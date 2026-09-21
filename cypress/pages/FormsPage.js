import BasePage from "./BasePage";

/**
 * FormsPage
 * Covers /forms: the list of forms and the "New form" creation
 * entry point (name the form, then it opens the Form Builder).
 *
 * NOTE: creating a form writes real data to production. Gate any
 * spec that calls createNewForm() behind
 * Cypress.env('allowWrites') — see cypress.config.js.
 */
class FormsPage extends BasePage {
  visit() {
    return super.visit("/forms");
  }

  openFormActionsMenu() {
    cy.contains("Form Actions").click();
    return this;
  }

  createNewForm(formName) {
    cy.contains("New form").click();
    cy.get("#formInput").click().type(formName);
    cy.contains("button", "Continue").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/form-builder");
    return this;
  }
}

export default new FormsPage();
