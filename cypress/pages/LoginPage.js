import BasePage from "./BasePage";

/**
 * LoginPage
 * TODO: swap the placeholder selectors below for ClientShot's real
 * ones. Prefer data-testid attributes if the app has them — they're
 * far less brittle than classes/ids that change with styling.
 */
class LoginPage extends BasePage {
  selectors = {
    emailInput: '[data-testid="login-email"], input[name="email"]',
    passwordInput: '[data-testid="login-password"], input[name="password"]',
    submitButton: '[data-testid="login-submit"], button[type="submit"]',
    loginErrorBanner: '[data-testid="login-error"]',
  };

  visit() {
    return super.visit("/login"); // TODO: confirm real login path
  }

  enterEmail(email) {
    this.get(this.selectors.emailInput).clear().type(email);
    return this;
  }

  enterPassword(password) {
    this.get(this.selectors.passwordInput).clear().type(password, {
      log: false, // don't print the password into the Cypress log
    });
    return this;
  }

  submit() {
    this.get(this.selectors.submitButton).click();
    return this;
  }

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
    return this;
  }

  assertLoginSucceeded() {
    // TODO: replace with a real post-login indicator, e.g. dashboard
    // element, nav bar item, or redirect to a specific path.
    cy.location("pathname", { timeout: 10000 }).should("not.include", "/login");
    this.get(this.selectors.loginErrorBanner).should("not.exist");
    return this;
  }
}

export default new LoginPage();
