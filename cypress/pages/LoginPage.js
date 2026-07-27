import BasePage from "./BasePage";

class LoginPage extends BasePage {
  selectors = {
    emailInput: '[data-testid="login-email"], input[name="email"], input[placeholder="Enter email address"]',
    passwordInput: '[data-testid="login-password"], input[name="password"], input[placeholder="Password"]',
    loginErrorBanner: '[data-testid="login-error"]',
  };

  visit() {
    return super.visit("/sign-in");
  }

  enterEmail(email) {
    this.get(this.selectors.emailInput)
      .should("be.visible")
      .clear()
      .type(email);
    return this;
  }

  enterPassword(password) {
    this.get(this.selectors.passwordInput)
      .should("be.visible")
      .clear()
      .type(password, { log: false });
    return this;
  }

  submit() {
    cy.contains("button", /^Login$/).should("be.visible").click();
    return this;
  }

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
    return this;
  }

  assertLoginSucceeded() {
    cy.location("pathname", { timeout: 20000 }).should("include", "/dashboard");
    this.get(this.selectors.loginErrorBanner).should("not.exist");
    return this;
  }
}

export default new LoginPage();
