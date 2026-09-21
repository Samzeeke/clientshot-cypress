import DashboardPage from "../../pages/DashboardPage";
import ResponsesPage from "../../pages/ResponsesPage";

// TODO: confirm these against a current form in the account —
// formId/mergeFormId are account-specific and the recorder export's
// values (formId=11, "Client Experience Feedback") may have changed
// since it was recorded.
const TEST_FORM = {
  formId: "Client Experience Feedback",
  state: "Kwara",
};

describe("ClientShot — Responses: Filter & Export", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  it("navigates to Responses via the Feedback nav section", () => {
    DashboardPage.goToResponses();
    cy.location("pathname").should("include", "/feedbacks/responses");
  });

  it("filters a form's responses by state and exports the current list", () => {
    ResponsesPage.visitFormResponses({ formId: TEST_FORM.formId });
    ResponsesPage.filterByStateAndBranch(TEST_FORM.state);
    // Filtering should update the list without erroring out.
    cy.contains(TEST_FORM.state).should("be.visible");
    ResponsesPage.exportCurrentList();
  });

  it("can generate a report for the current response set", () => {
    ResponsesPage.visitFormResponses({ formId: TEST_FORM.formId });
    ResponsesPage.generateReport();
  });
});
