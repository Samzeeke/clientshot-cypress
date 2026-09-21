describe("ClientShot — Login", () => {
  it("logs in successfully with valid QA production credentials", () => {
    cy.loginAsQaUser();
  });
});
