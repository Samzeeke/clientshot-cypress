import BasePage from "./BasePage";

/**
 * PublicSurveyPage
 * Covers the public-facing survey flow (no login required) — what a
 * respondent fills out at a /flow/... link. The recorder export
 * shows a wizard: one question per screen, "Next" to advance.
 *
 * Question sets differ per form/client, so this page object exposes
 * generic step interactions rather than hardcoding one form's exact
 * questions — the spec composes these into the flow it's testing.
 */
class PublicSurveyPage extends BasePage {
  visitFlow(orgSlug, flowId) {
    return super.visit(`/flow/${orgSlug}/${flowId}`);
  }

  selectRadioOption(optionLabel) {
    cy.contains(optionLabel).click();
    return this;
  }

  selectCheckboxOptions(optionLabels = []) {
    optionLabels.forEach((label) => cy.contains(label).click());
    return this;
  }

  fillTextArea(text) {
    cy.get("textarea").first().click().type(text);
    return this;
  }

  fillPhoneNumber(number) {
    cy.get('input[type="tel"], input[name="phone"]').type(number);
    return this;
  }

  fillEmail(email) {
    cy.get('input[type="email"]').type(email);
    return this;
  }

  clickNext() {
    cy.contains("button", "Next").click();
    return this;
  }

  submit() {
    cy.contains("button", "Submit").click();
    return this;
  }

  assertSubmissionComplete() {
    cy.contains("Thank you for your time").should("be.visible");
    return this;
  }
}

export default new PublicSurveyPage();
