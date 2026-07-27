import BasePage from "./BasePage";

<<<<<<< HEAD
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
=======
class LoginPage extends BasePage {
  selectors = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    loginErrorBanner: '.error-message',
  };

  visit() {
    return super.visit("/sign-in");
  }

  enterEmail(email) {
    this.get(this.selectors.emailInput)
      .should("be.visible")
      .clear()
      .type(email);

>>>>>>> b29760a (Add Cypress smoke test scripts)
    return this;
  }

  enterPassword(password) {
<<<<<<< HEAD
    this.get(this.selectors.passwordInput).clear().type(password, {
      log: false, // don't print the password into the Cypress log
    });
=======
    this.get(this.selectors.passwordInput)
      .should("be.visible")
      .clear()
      .type(password, { log: false });

>>>>>>> b29760a (Add Cypress smoke test scripts)
    return this;
  }

  submit() {
<<<<<<< HEAD
    this.get(this.selectors.submitButton).click();
    return this;
  }
=======
  cy.contains("button", "Login")
    .should("be.visible")
    .click();

  return this;
}

>>>>>>> b29760a (Add Cypress smoke test scripts)

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
<<<<<<< HEAD
=======

>>>>>>> b29760a (Add Cypress smoke test scripts)
    return this;
  }

  assertLoginSucceeded() {
<<<<<<< HEAD
    // TODO: replace with a real post-login indicator, e.g. dashboard
    // element, nav bar item, or redirect to a specific path.
    cy.location("pathname", { timeout: 10000 }).should("not.include", "/login");
    this.get(this.selectors.loginErrorBanner).should("not.exist");
    return this;
  }
}

export default new LoginPage();
=======
    cy.url({ timeout: 20000 }).should("include", "/dashboard");
    return this;
  }}

export default new LoginPage();
>>>>>>> b29760a (Add Cypress smoke test scripts)
