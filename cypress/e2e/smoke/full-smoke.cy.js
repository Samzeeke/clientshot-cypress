import NavPage from "../../pages/NavPage";

describe("ClientShot — Production Smoke Suite", () => {
  beforeEach(() => {
    // UI login every test, per requirement — no session caching.
    cy.loginAsQaUser();
  });

  NavPage.pages.forEach(({ name, path }) => {
    it(`loads the ${name} page without errors`, () => {
      NavPage.visit(path);
      NavPage.assertPageHealthy();
    });
  });

  it("navigates the whole nav bar without a full reload (click-through check)", () => {
    NavPage.visit("/dashboard");
    NavPage.pages.forEach(({ name, navTestId }) => {
      if (!navTestId) return;
      NavPage.goToViaNav(navTestId);
      NavPage.assertPageHealthy();
      cy.log(`Navigated to ${name} via nav bar`);
    });
  });
});
