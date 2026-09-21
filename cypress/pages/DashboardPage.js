import BasePage from "./BasePage";

/**
 * DashboardPage
 * Sidebar navigation, sourced from the Katalon recorder export.
 * The "Feedback" and "Configurations" sections are collapsible
 * groups (svg chevron toggles them open) that reveal sub-links.
 */
class DashboardPage extends BasePage {
  selectors = {
    feedbackChevron: "svg", // TODO: recorder used a proximity xpath near "Feedback" text — replace with a real toggle selector, e.g. [data-testid="nav-feedback-toggle"]
    complaintsLink: "a",     // recorded as link=Complaints
    responsesLink: "a",      // recorded as link=Responses
    configurationsToggle: "div", // recorded via proximity to "Configurations" text
    userManagementLink: "a", // recorded as link=User Management
    formsLink: "a",           // recorded as link=Forms
  };

  visit() {
    return super.visit("/dashboard");
  }

  openFeedbackSection() {
    cy.contains("Feedback").parent().find("svg").first().click({ force: true });
    return this;
  }

  goToComplaints() {
    this.openFeedbackSection();
    cy.contains("a", "Complaints").click();
    cy.location("pathname").should("include", "/feedbacks/complaints");
    return this;
  }

  goToResponses() {
    this.openFeedbackSection();
    cy.contains("a", "Responses").click();
    cy.location("pathname").should("include", "/feedbacks/responses");
    return this;
  }

  openConfigurationsSection() {
    cy.contains("Configurations").click({ force: true });
    return this;
  }

  goToUserManagement() {
    this.openConfigurationsSection();
    cy.contains("a", "User Management").click();
    cy.location("pathname").should("include", "/user-management");
    return this;
  }

  goToForms() {
    cy.contains("a", "Forms").click();
    cy.location("pathname").should("include", "/forms");
    return this;
  }
}

export default new DashboardPage();
