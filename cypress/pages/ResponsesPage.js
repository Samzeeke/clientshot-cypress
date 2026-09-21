import BasePage from "./BasePage";

/**
 * ResponsesPage
 * Covers the "FILTER & EXPORT RESPONSE" module: select a specific
 * form's responses, filter by State/Branch, export current list,
 * and generate a report.
 */
class ResponsesPage extends BasePage {
  visit(query = "") {
    return super.visit(`/feedbacks/responses${query}`);
  }

  // The recorder shows navigating straight to a specific form's
  // responses via query params — real ClientShot form/merge IDs are
  // account-specific, so pass them in rather than hardcoding.
  visitFormResponses({ formId, mergeFormId } = {}) {
    if (formId) {
      return super.visit(`/feedbacks/responses?checkedform=${encodeURIComponent(formId)}&page=1`);
    }
    if (mergeFormId) {
      return super.visit(`/feedbacks/responses?mergeFormId=${mergeFormId}&formId=${mergeFormId}&checkedform=&page=1`);
    }
    return this.visit();
  }

  openFilterPanel() {
    cy.contains("Filter").click();
    return this;
  }

  filterByStateAndBranch(state, branch) {
    this.openFilterPanel();
    cy.contains("State").parent().click();
    cy.contains(state).click();
    if (branch) {
      cy.contains("Branch").parent().click();
      cy.contains(branch).click();
    }
    cy.contains("button", "Apply").click();
    return this;
  }

  exportCurrentList() {
    cy.contains("Export").click();
    cy.contains("Current list").click();
    cy.contains("Export Data").click();
    return this;
  }

  generateReport() {
    cy.contains("button", "Generate Report").click();
    return this;
  }
}

export default new ResponsesPage();
