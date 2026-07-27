describe("Sign-up smoke", () => {
  beforeEach(() => {
    cy.visit("/sign-up", { failOnStatusCode: false });
  });

  it("renders the account form without creating an account", () => {
    cy.get('input[placeholder="Enter your first name"]').should("be.visible");
    cy.get('input[placeholder="Enter your last name"]').should("be.visible");
    cy.get('input[placeholder="Enter email address"]').should("be.visible");
    cy.get('input[placeholder="Create Password"]').should("be.visible");
    cy.get('input[placeholder="Confirm Password"]').should("be.visible");
    cy.contains("button", /create account/i).should("be.visible");
  });
});
