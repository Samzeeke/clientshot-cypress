import BasePage from "./BasePage";

/**
 * ComplaintsPage
 * Covers the "Export Complaint" module from the recorder export:
 * Feedback > Complaints > open export panel > confirm unfiltered
 * export > (optionally) send/download.
 */
class ComplaintsPage extends BasePage {
  selectors = {
    exportButton: "button", // recorded near "Export" text, css=div.btn inside a button
    downloadFileButton: "app-button-wrapper button", // recorded css=app-button-wrapper[type="PRIMARY"] > button.primary
  };

  visit() {
    return super.visit("/feedbacks/complaints");
  }

  openExportPanel() {
    cy.contains("Export").click();
    return this;
  }

  // Recorder flow exports with no filters applied and confirms the
  // "you are about to export this data without any filters" warning.
  confirmUnfilteredExport() {
    cy.contains(
      "you are about to export this data without any filters"
    ).should("be.visible");
    cy.contains("button", "Download file").click();
    return this;
  }

  exportAllComplaints() {
    this.openExportPanel();
    this.confirmUnfilteredExport();
    return this;
  }
}

export default new ComplaintsPage();
