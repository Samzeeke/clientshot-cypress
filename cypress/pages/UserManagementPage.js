import BasePage from "./BasePage";

/**
 * UserManagementPage
 * Covers Configurations > User Management: inviting a teammate
 * (email + role) and filtering the user list by role/branch/status.
 *
 * NOTE: inviting a real user sends a real invitation email in
 * production. Keep any "invite" spec gated behind
 * Cypress.env('allowWrites') — see cypress.config.js — so this
 * suite stays read-only by default.
 */
class UserManagementPage extends BasePage {
  visit() {
    return super.visit("/user-management");
  }

  openInvitePanel() {
    cy.contains("button", "Invite Teammates").click();
    return this;
  }

  inviteUser({ email, role }) {
    this.openInvitePanel();
    if (role) {
      cy.contains(role).click(); // role dropdown, e.g. "Central Admin"
    }
    cy.get("#formInput").click().type(email);
    cy.contains("button", "Send Invitation").click();
    return this;
  }

  openFilters() {
    cy.contains("Filters").click();
    return this;
  }

  filterByRole(role) {
    this.openFilters();
    cy.contains("Role").parent().click();
    cy.contains(role).click();
    return this;
  }

  filterByStatus(status) {
    this.openFilters();
    cy.contains("Status").parent().click();
    cy.contains(status).click();
    return this;
  }
}

export default new UserManagementPage();
