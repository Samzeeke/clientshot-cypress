import DashboardPage from "../../pages/DashboardPage";
import UserManagementPage from "../../pages/UserManagementPage";

describe("ClientShot — User Management", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  it("navigates to User Management via Configurations", () => {
    DashboardPage.goToUserManagement();
    cy.location("pathname").should("include", "/user-management");
  });

  it("filters the user list by role", () => {
    UserManagementPage.visit();
    UserManagementPage.filterByRole("Central Admin");
    cy.contains("Central Admin").should("be.visible");
  });

  it("filters the user list by status", () => {
    UserManagementPage.visit();
    UserManagementPage.filterByStatus("Active");
    cy.contains("Active").should("be.visible");
  });

  // Sends a REAL invitation email in production — only runs when
  // explicitly enabled. Run with:
  //   npx cypress run --env allowWrites=true
  (Cypress.expose("allowWrites") ? it : it.skip)(
    "invites a new teammate",
    () => {
      UserManagementPage.visit();
      UserManagementPage.inviteUser({
        email: `qa-invite-${Date.now()}@example.com`, // unique per run
        role: "Central Admin",
      });
      cy.contains("Send Invitation").should("not.exist"); // modal closed = sent
    }
  );
});
