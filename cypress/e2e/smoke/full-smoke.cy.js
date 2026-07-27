import NavPage from "../../pages/NavPage";

describe("ClientShot — Production Smoke Suite", () => {
  before(() => {
    // One UI login per spec avoids production rate limiting while still
    // exercising the real authentication flow.
    cy.loginAsQaUser();
  });

  NavPage.pages.forEach(({ name, path }) => {
    it(`loads the ${name} page without errors`, () => {
      NavPage.visit(path);
      NavPage.assertPageHealthy();
    });
  });
});
