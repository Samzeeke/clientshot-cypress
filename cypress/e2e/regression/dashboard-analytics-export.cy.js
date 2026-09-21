import {
  dashboardAnalyticsPage,
  feedbackFilterPage,
} from "../../pages/DashboardAnalyticsPage";

// TODO: confirm "Kuje" and "Kwali" (LGAs) and "Mabushi CSCC"
// (facility) are still valid options for the QA account — these are
// specific values from the recorder export and may be account/data
// dependent (e.g. tied to the IHVN FCT client's location list).
const LOCATION = { lga: "Kwali", facility: "Mabushi CSCC" };

describe("ClientShot — Dashboard Analytics & Location-Filtered Feedback", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  it("opens the Total Respondents breakdown from the dashboard", () => {
    dashboardAnalyticsPage.visit();
    dashboardAnalyticsPage.openAndCloseRespondentsBreakdown();
  });

  it("filters feedback by LGA and facility, then exports", () => {
    feedbackFilterPage.visit();
    feedbackFilterPage.filterByLgaAndFacility(LOCATION.lga, LOCATION.facility);
    cy.contains(LOCATION.facility).should("be.visible");
    feedbackFilterPage.exportFilteredFeedback();
  });
});
