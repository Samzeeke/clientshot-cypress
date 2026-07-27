const VALID_EMAIL = 'Adamamusa32@gmail.com';

class ForgotPasswordPage {
    get emailInput() {
        return cy.get('input[aria-label="Enter email address"], input[type="email"]').first();
    }

    get sendResetLinkButton() {
        return cy.contains('button', /send reset link/i).filter(':visible').first();
    }

    get confirmationMessage() {
        return cy.contains(/reset link|sent|success/i).filter(':visible').first();
    }

    get createAccountLink() {
        return cy.contains('a, span, button, div', /create an account/i).filter(':visible').first();
    }

    get header() {
        return cy.contains(/forgot password/i).filter(':visible').first();
    }

    get subTitle() {
        return cy.contains(/enter your email to get your reset link/i).filter(':visible').first();
    }

    enterEmail(email) {
        this.emailInput.clear().type(email);
    }

    clickSendResetLink() {
        this.sendResetLinkButton.should('be.visible').click({ force: true });
    }

    verifyConfirmationMessage() {
        this.confirmationMessage.should('be.visible');
    }

    verifyCreateAccountLink() {
        this.createAccountLink.should('be.visible');
    }

    pageElementsVisible() {
        this.header.should('be.visible');
        this.subTitle.should('be.visible');
        this.emailInput.should('be.visible');
        this.sendResetLinkButton.should('be.visible');
    }

    checkButtonDisabled() {
        this.sendResetLinkButton.should('be.disabled');
    }
}

describe('Forgot Password Tests', () => {
    const forgotPasswordPage = new ForgotPasswordPage();

    beforeEach(() => {
        cy.visit('/forgot-password', { failOnStatusCode: false });
        forgotPasswordPage.pageElementsVisible();
    });

    it('Verify that the user can enter a valid email address and click the "Send reset link" button', () => {
        cy.intercept('POST', '**/forgot/password', { statusCode: 200, body: { success: true } }).as('resetRequest');
        forgotPasswordPage.enterEmail(VALID_EMAIL);
        forgotPasswordPage.sendResetLinkButton.should('not.be.disabled');
        forgotPasswordPage.clickSendResetLink();
        cy.wait('@resetRequest');
    });

    it('Ensure the input field accepts various email formats', () => {
        const emailFormats = [
            'user@example.com',
            'user@sub.example.com',
            'user.name@example.com',
            'user+tag@example.com'
        ];

        emailFormats.forEach((email) => {
            forgotPasswordPage.enterEmail(email);
            forgotPasswordPage.emailInput.should('have.value', email);
            forgotPasswordPage.sendResetLinkButton.should('not.be.disabled');
        });
    });

    it('Confirm that the "Create an Account" link is visible', () => {
        forgotPasswordPage.verifyCreateAccountLink();
    });

    it('Validate that the page loads correctly and displays all elements', () => {
        forgotPasswordPage.pageElementsVisible();
    });

    it('Test the scenario where the user submits an empty email field', () => {
        forgotPasswordPage.emailInput.clear();
        forgotPasswordPage.emailInput.should('have.value', '');
        forgotPasswordPage.checkButtonDisabled();
    });

    it('Attempt to enter an invalid email format and check that the button stays disabled', () => {
        forgotPasswordPage.enterEmail('invalidemail.com');
        forgotPasswordPage.sendResetLinkButton.should('be.disabled');
    });

    it('Check the behavior when the button is disabled', () => {
        forgotPasswordPage.checkButtonDisabled();
    });

    it('Verify that the system does not accept special characters in the email input', () => {
        forgotPasswordPage.enterEmail('invalid!#$%&\'*+/=?^_`{|}~@example.com');
        forgotPasswordPage.sendResetLinkButton.should('be.disabled');
    });

    it('Simulate a network failure when requesting reset link', () => {
        cy.intercept('POST', '**/forgot/password', { statusCode: 500, body: { message: 'error' } }).as('resetLinkRequest');
        forgotPasswordPage.enterEmail(VALID_EMAIL);
        forgotPasswordPage.sendResetLinkButton.should('not.be.disabled');
        forgotPasswordPage.clickSendResetLink();
        cy.wait('@resetLinkRequest');
    });

    it('Test rapid clicks on "Send reset link" button', () => {
        forgotPasswordPage.enterEmail(VALID_EMAIL);
        for (let i = 0; i < 3; i++) {
            forgotPasswordPage.clickSendResetLink();
        }
        forgotPasswordPage.sendResetLinkButton.should('be.visible');
    });

    it('Verify the create account link is visible and text is present', () => {
        forgotPasswordPage.createAccountLink.should('contain.text', 'Create');
    });

    it('Check responsiveness of the form', () => {
        cy.viewport('iphone-6');
        forgotPasswordPage.pageElementsVisible();
    });

    it('Simulate pasting an email address into the input field', () => {
        const email = 'pasted@example.com';
        forgotPasswordPage.emailInput.then(($input) => {
            const input = $input[0];
            input.focus();
            input.value = email;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        forgotPasswordPage.emailInput.should('have.value', email);
    });
});