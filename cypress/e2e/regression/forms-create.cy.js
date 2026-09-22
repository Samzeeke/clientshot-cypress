import DashboardPage from "../../pages/DashboardPage";
import FormsPage from "../../pages/FormsPage";
import FormBuilderPage from "../../pages/FormBuilderPage";

describe("ClientShot — Forms: Create", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  it("navigates to Forms from the dashboard", () => {
    DashboardPage.goToForms();
    cy.location("pathname").should("include", "/forms");
  });

  // Creates REAL data in production — only runs when explicitly
  // enabled. Run with:
  //   npx cypress run --env allowWrites=true
  (Cypress.expose("allowWrites") ? it : it.skip)(
    "creates a new form with a dropdown and a radio question",
    () => {
      const formName = `QA Regression Form ${Date.now()}`;

      FormsPage.visit();
      FormsPage.createNewForm(formName);

      FormBuilderPage.addChoiceQuestion(
        "What is your gender?",
        "Dropdown",
        ["Male", "Female", "I don't know"]
      );

      FormBuilderPage.addChoiceQuestion(
        "What is your religion",
        "Radio",
        ["Christian", "Muslim", "Jew"]
      );

      FormBuilderPage.saveChanges();
      cy.contains("Save changes").should("not.exist"); // saved = button/modal gone
    }
  );
});
