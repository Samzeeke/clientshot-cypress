import LoginPage from "../../pages/LoginPage";

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
