import BasePage from "./BasePage";

/**
 * NavPage
 * Central registry of pages the smoke suite sweeps through.
 *
 * TODO: replace this placeholder list with ClientShot's real pages.
 * `path` should be relative to baseUrl. `testId` (optional) can point
 * at a nav link so we click through the UI instead of hitting the
 * URL directly, which better catches broken nav links.
 */
class NavPage extends BasePage {
  pages = [
    { name: "Dashboard", path: "/dashboard", navTestId: "nav-dashboard" },
    { name: "Builds", path: "/builds", navTestId: "nav-builds" },
    { name: "Upload", path: "/upload", navTestId: "nav-upload" },
    { name: "Profile", path: "/profile", navTestId: "nav-profile" },
    { name: "Settings", path: "/settings", navTestId: "nav-settings" },
    // Add every remaining page/section here so the smoke spec
    // covers the whole app automatically.
  ];

  navLink(testId) {
    return cy.get(`[data-testid="${testId}"]`);
  }

  goToViaNav(navTestId) {
    this.navLink(navTestId).click();
    return this;
  }
}

export default new NavPage();
