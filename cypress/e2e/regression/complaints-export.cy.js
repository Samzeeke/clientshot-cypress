import DashboardPage from "../../pages/DashboardPage";
import ComplaintsPage from "../../pages/ComplaintsPage";

describe("ClientShot — Complaints: Export", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  it("navigates to Complaints via the Feedback nav section", () => {
    DashboardPage.goToComplaints();
    cy.location("pathname").should("eq", "/feedbacks/complaints");
  });

  it("exports the full complaints list with no filters applied", () => {
    ComplaintsPage.visit();
    ComplaintsPage.exportAllComplaints();
    // The export modal's warning text is the real confirmation that
    // this is an unfiltered, full-dataset export — assert it showed.
    cy.contains(
      "you are about to export this data without any filters"
    ).should("be.visible");
  });
});
