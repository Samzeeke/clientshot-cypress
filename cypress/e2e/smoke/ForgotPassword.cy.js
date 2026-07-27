describe("Forgot password smoke", () => {
  beforeEach(() => {
    cy.visit("/forgot-password", { failOnStatusCode: false });
  });

  it("renders the reset form without sending a reset email", () => {
    cy.contains(/forgot password/i).should("be.visible");
    cy.get('input[aria-label="Enter email address"], input[type="email"]')
      .first()
      .should("be.visible");
    cy.contains("button", /send reset link/i).should("be.visible");
    cy.contains(/create an account/i).should("be.visible");
  });
});
