import BasePage from "./BasePage";

/**
 * DashboardAnalyticsPage
 * Covers the "IHVN FCT" module: the dashboard's "Total Respondents"
 * breakdown modal, and the Feedback page's LGA/Facility filter +
 * export flow (a variant of ComplaintsPage's export, but scoped to
 * a Local Government Area / Facility rather than unfiltered).
 */
class DashboardAnalyticsPage extends BasePage {
  visit() {
    return super.visit("/dashboard");
  }

  // Opens the "Total Respondents" breakdown modal from the main
  // dashboard widget, then closes it again — a read-only check that
  // the analytics widget renders without erroring.
  openAndCloseRespondentsBreakdown() {
    cy.contains("Total Respondents").click();
    cy.contains("See Breakdown").should("be.visible");
    // Recorder closed the modal via a small svg close icon near the
    // second "Total Respondents" occurrence inside the modal.
    cy.get("body").then(($body) => {
      const closeIcon = $body.find(".close-btn svg, [class*='close'] svg").first();
      if (closeIcon.length) cy.wrap(closeIcon).click({ force: true });
    });
    return this;
  }
}

/**
 * FeedbackFilterPage
 * Covers /feedback: filtering by Local Government Area + Facility,
 * then exporting. Distinct from ComplaintsPage (/feedbacks/complaints)
 * — this is the general Feedback list with a location-based filter,
 * per the recorder export.
 */
class FeedbackFilterPage extends BasePage {
  visit() {
    return super.visit("/feedback");
  }

  openFilterPanel() {
    cy.contains("button", "Filter").click();
    return this;
  }

  // Filters by LGA then, optionally, a specific facility within it.
  filterByLgaAndFacility(lga, facility) {
    this.openFilterPanel();
    cy.contains("Local Government Area").parent().click();
    cy.contains(lga).click();
    if (facility) {
      cy.contains("Facility").parent().click();
      cy.contains(facility).click();
    }
    cy.contains("button", "Apply Filter").click();
    return this;
  }

  exportFilteredFeedback() {
    cy.contains("button", "Export").click();
    return this;
  }
}

export const dashboardAnalyticsPage = new DashboardAnalyticsPage();
export const feedbackFilterPage = new FeedbackFilterPage();
