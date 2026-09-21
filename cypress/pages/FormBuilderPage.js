import BasePage from "./BasePage";

/**
 * FormBuilderPage
 * Covers /form-builder: adding questions of different types
 * (short answer / text area, dropdown with options, radio with
 * options) and saving the form.
 *
 * The recorder export shows three question types built in sequence:
 * 1. A text-area "description" style question
 * 2. A dropdown question ("What is your gender?") with typed-in
 *    options confirmed via Enter key
 * 3. A radio-style question ("What is your religion") with typed-in
 *    options
 *
 * Selectors here are best-effort from the recording; the form
 * builder's internal structure is deeply nested/indexed (e.g.
 * `div[5]/div/div/div/div/div/input`), which is inherently brittle.
 * Strongly recommend asking dev to add data-testid to each question
 * row's title input and option inputs before relying on this long
 * term.
 */
class FormBuilderPage extends BasePage {
  visit() {
    return super.visit("/form-builder");
  }

  setFormTitle(title) {
    cy.get("app-form-input div input").first().click().clear().type(title);
    return this;
  }

  addTextQuestion(questionText, helperText) {
    cy.get("app-form-input div input").last().click().clear().type(questionText);
    if (helperText) {
      cy.get("#textArea").click().type(helperText);
    }
    return this;
  }

  // Adds a question, sets its type via the type dropdown, then adds
  // one or more options (each typed then confirmed with Enter).
  addChoiceQuestion(questionText, type, options = []) {
    cy.get("app-form-input div input").last().click().clear().type(questionText);
    cy.contains("Type").parent().click();
    cy.contains(type).click(); // e.g. "Dropdown" or "Radio"

    options.forEach((option) => {
      cy.focused().type(`${option}{enter}`);
    });
    return this;
  }

  saveChanges() {
    cy.contains("button", "Save changes").click();
    return this;
  }
}

export default new FormBuilderPage();
