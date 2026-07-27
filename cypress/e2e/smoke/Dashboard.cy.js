import BasePage from "../../pages/BasePage";

describe("Dashboard smoke", () => {
  before(() => {
    cy.loginAsQaUser();
  });

  it("loads the authenticated dashboard", () => {
    cy.location("pathname").should("include", "/dashboard");
    new BasePage().assertPageHealthy();
  });
});
