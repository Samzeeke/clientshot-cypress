import NavPage from "../../pages/NavPage";

describe("ClientShot — Production Smoke Suite", () => {
  beforeEach(() => {
    cy.loginAsQaUser();
  });

  NavPage.pages.forEach(({ name, path }) => {
    it(`loads the ${name} page without errors`, () => {
      NavPage.visit(path);
      NavPage.assertPageHealthy();
    });
  });
});
