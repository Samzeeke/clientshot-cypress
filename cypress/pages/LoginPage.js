import BasePage from "./BasePage";

/**
 * LoginPage
 * Selectors below are sourced from the Katalon Recorder export
 * (PROD_REGRESSION_TEST_SUIT.krecorder) rather than guesses. Still
 * worth hardening with data-testid attributes if/when the dev team
 * can add them — class-based selectors like `button.primary` will
 * break if the design system changes button classes.
 */
class LoginPage extends BasePage {
  selectors = {
    emailInput: "input[type='email']",
    passwordInput: "input[type='password']",
    // Recorded as css=button.primary — the only primary button on
    // the sign-in screen, i.e. the Login/Sign in submit button.
    submitButton: ".welcome-margin > .main-body-box > app-button > .primary",
    loginErrorBanner: '[data-testid="login-error"]', // TODO: confirm real error selector
  };

  visit() {
    return super.visit("/sign-in");
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
    // After login, ClientShot either lands on /dashboard directly or
    // shows the workspace picker first (see WorkspacePage). Either
    // way we should have left /sign-in.
    cy.location("pathname", { timeout: 10000 }).should("not.include", "/sign-in");
    return this;
  }
}

export default new LoginPage();
