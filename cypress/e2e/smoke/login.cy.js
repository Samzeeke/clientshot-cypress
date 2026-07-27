import LoginPage from "../../pages/LoginPage";

<<<<<<< HEAD
describe("ClientShot — Login", () => {
  it("logs in successfully with valid QA production credentials", () => {
    LoginPage.visit();
    LoginPage.login(
      Cypress.env("qaUserEmail"),
      Cypress.env("qaUserPassword")
    );
    LoginPage.assertLoginSucceeded();
  });
});
=======
const VALID_EMAIL = Cypress.env("qaUserEmail");
const VALID_PASSWORD = Cypress.env("qaUserPassword");
const INVALID_EMAIL = "invalid-email";
const INVALID_PASSWORD = "WrongPassword";
const SHORT_PASSWORD = "123";
const EXPIRED_PASSWORD = "ExpiredPassword";
const NONEXISTENT_EMAIL = "nonexistent@example.com";

describe("ClientShot - Login Tests", () => {

    beforeEach(() => {
        LoginPage.visit();
    });

    it("logs in successfully with valid QA production credentials", () => {
        LoginPage.login(VALID_EMAIL, VALID_PASSWORD);
        LoginPage.assertLoginSucceeded();
    });

    it("Verify welcome message is displayed", () => {
        cy.contains("Welcome").should("be.visible");
    });

    it("Verify instruction message is displayed", () => {
        cy.contains("Enter your details").should("be.visible");
    });

    it("Email field accepts valid email", () => {
        LoginPage.enterEmail(VALID_EMAIL);

        cy.get('input[type="email"]')
            .should("have.value", VALID_EMAIL);
    });

    it("Password field accepts valid password", () => {
        LoginPage.enterPassword(VALID_PASSWORD);

        cy.get('input[type="password"]')
            .should("have.value", VALID_PASSWORD);
    });

    it("Forgot Password link redirects correctly", () => {
        cy.contains(/forgot password/i).click();
        cy.url().should("include", "/forgot-password");
    });

    it("Login button is visible", () => {
        cy.contains("button", /login/i)
            .should("be.visible");
    });

    it("Google Sign In button is displayed", () => {
        cy.get('iframe[title="Sign in with Google Button"]')
            .should("exist");
    });

    it("Sign Up link redirects correctly", () => {
        cy.contains(/sign up/i).click();
        cy.url().should("include", "/sign-up");
    });

    it("Shows validation for invalid email", () => {
        LoginPage.login(INVALID_EMAIL, VALID_PASSWORD);

        cy.url().should("include", "/sign-in");
    });

    it("Shows validation for incorrect password", () => {
        LoginPage.login(VALID_EMAIL, INVALID_PASSWORD);

        cy.url().should("include", "/sign-in");
    });

    it("Email is required", () => {
        LoginPage.enterPassword(VALID_PASSWORD);

        cy.contains("button", /login/i).click();

        cy.get('input[type="email"]')
            .should("have.value", "");
    });

    it("Rejects short password", () => {
        LoginPage.login(VALID_EMAIL, SHORT_PASSWORD);

        cy.url().should("include", "/sign-in");
    });

    it("Cannot login with empty fields", () => {
        cy.contains("button", /login/i).click();

        cy.get('input[type="email"]').should("have.value", "");
        cy.get('input[type="password"]').should("have.value", "");
    });

    it("Forgot Password page opens", () => {
        cy.contains(/forgot password/i).click();
        cy.url().should("include", "/forgot-password");
    });

    it("Expired password scenario", () => {
        LoginPage.login(VALID_EMAIL, EXPIRED_PASSWORD);

        cy.url().should("include", "/sign-in");
    });

    it("Responsive on mobile", () => {
        cy.viewport(320, 480);

        cy.contains("Welcome").should("be.visible");

        cy.get('input[type="email"]').should("be.visible");
        cy.get('input[type="password"]').should("be.visible");
    });

    it("Multiple failed login attempts", () => {
        for (let i = 0; i < 5; i++) {
            LoginPage.visit();
            LoginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        }

        cy.url().should("include", "/sign-in");
    });

    it("Handles slow login", () => {
        cy.intercept("POST", "**/login").as("login");

        LoginPage.login(VALID_EMAIL, VALID_PASSWORD);

        cy.wait("@login", { timeout: 15000 });
    });

    it("Accessibility check", () => {
        cy.get('input[type="email"]').should("be.visible");
        cy.get('input[type="password"]').should("be.visible");
        cy.contains("button", /login/i).should("be.visible");
    });

    it("Non-existent user remains on login page", () => {
        LoginPage.login(NONEXISTENT_EMAIL, VALID_PASSWORD);

        cy.url().should("include", "/sign-in");

        cy.contains(/sign up/i).should("be.visible");
    });

});
>>>>>>> b29760a (Add Cypress smoke test scripts)
