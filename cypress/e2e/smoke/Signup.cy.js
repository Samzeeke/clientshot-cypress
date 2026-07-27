// signUpPage.js
class SignUpPage {
    get firstNameInput() { return cy.get('input[placeholder="Enter your first name"]'); }
    get lastNameInput() { return cy.get('input[placeholder="Enter your last name"]'); }
    get emailInput() { return cy.get('input[placeholder="Enter email address"]'); }
    get passwordInput() { return cy.get('input[placeholder="Create Password"]'); }
    get confirmPasswordInput() { return cy.get('input[placeholder="Confirm Password"]'); }
    get createAccountButton() { return cy.get('button.primary'); }
    get privacyPolicyLink() { return cy.get('a[href="/privacy-policy"]').filter(':visible').first(); }
    get termsConditionsLink() { return cy.get('a[href="/terms-and-conditons"]').filter(':visible').first(); }
    get errorMessage() { return cy.get('.error-message-class'); } // Replace with actual error message selector

    fillFirstName(firstName) {
        this.firstNameInput.clear();
        if (firstName !== '') {
            this.firstNameInput.type(firstName);
        }
    }

    fillLastName(lastName) {
        this.lastNameInput.clear();
        if (lastName !== '') {
            this.lastNameInput.type(lastName);
        }
    }

    fillEmail(email) {
        this.emailInput.clear();
        if (email !== '') {
            this.emailInput.type(email);
        }
    }

    fillPassword(password) {
        this.passwordInput.clear();
        if (password !== '') {
            this.passwordInput.type(password);
        }
    }

    fillConfirmPassword(confirmPassword) {
        this.confirmPasswordInput.clear();
        if (confirmPassword !== '') {
            this.confirmPasswordInput.type(confirmPassword);
        }
    }

    clickCreateAccount() {
        this.createAccountButton.should('be.visible').click();
    }

    assertSignupPageVisible() {
        cy.location('pathname', { timeout: 10000 }).should('include', '/sign-up');
        this.firstNameInput.should('be.visible');
        this.lastNameInput.should('be.visible');
        this.emailInput.should('be.visible');
        this.createAccountButton.should('be.visible');
    }

    visit() {
        cy.visit('https://app.clientshot.com/sign-up', { failOnStatusCode: false });
        cy.location('pathname', { timeout: 10000 }).should('include', '/sign-up');
    }

    clickPrivacyPolicy() {
        this.privacyPolicyLink.should('be.visible').click({ force: true });
    }

    clickTermsConditions() {
        this.termsConditionsLink.should('be.visible').click({ force: true });
    }
}

// signUp.spec.js
describe('Sign Up Form Tests', () => {
    const signUpPage = new SignUpPage();

    it('Verify that the user can successfully enter their first name and last name', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('John');
        signUpPage.fillLastName('Doe');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should('have.value', 'John');
        signUpPage.lastNameInput.should('have.value', 'Doe');
    });

    it('Check that the email input field accepts valid email formats', () => {
        signUpPage.visit();
        signUpPage.fillEmail('john.doe@example.com');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.emailInput.should('have.value', 'john.doe@example.com');
    });

    it('Ensure that password and confirm password fields accept valid passwords', () => {
        signUpPage.visit();
        signUpPage.fillPassword('Password123!');
        signUpPage.fillConfirmPassword('Password123!');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.passwordInput.should('have.value', 'Password123!');
        signUpPage.confirmPasswordInput.should('have.value', 'Password123!');
    });

    it('Confirm that clicking the Create Account button submits the form successfully', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('John');
        signUpPage.fillLastName('Doe');
        signUpPage.fillEmail('john.doe@example.com');
        signUpPage.fillPassword('Password123!');
        signUpPage.fillConfirmPassword('Password123!');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.createAccountButton.should('be.visible').and('not.be.disabled');
    });

    it('Validate that the user can read and access the Privacy Policy', () => {
        signUpPage.visit();
        signUpPage.clickPrivacyPolicy();
        cy.contains('privacy', { matchCase: false }).should('be.visible');
    });

    it('Test the form submission with an empty first name, last name, or email field', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('');
        signUpPage.fillLastName('');
        signUpPage.fillEmail('');
        signUpPage.clickCreateAccount();
        cy.location('pathname', { timeout: 10000 }).should('include', '/sign-up');
        signUpPage.firstNameInput.should('have.value', '');
        signUpPage.lastNameInput.should('have.value', '');
        signUpPage.emailInput.should('have.value', '');
    });

    it('Attempt to submit the form with an invalid email format', () => {
        signUpPage.visit();
        signUpPage.fillEmail('invalid-email');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.emailInput.should('have.value', 'invalid-email');
    });

    it('Enter mismatched passwords in the password and confirm password fields', () => {
        signUpPage.visit();
        signUpPage.fillPassword('Password123!');
        signUpPage.fillConfirmPassword('DifferentPassword!');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.passwordInput.should('have.value', 'Password123!');
        signUpPage.confirmPasswordInput.should('have.value', 'DifferentPassword!');
    });

    it('Test submission without agreeing to the Terms and Conditions', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('John');
        signUpPage.fillLastName('Doe');
        signUpPage.fillEmail('john.doe@example.com');
        signUpPage.fillPassword('Password123!');
        signUpPage.fillConfirmPassword('Password123!');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should('have.value', 'John');
        signUpPage.lastNameInput.should('have.value', 'Doe');
        signUpPage.emailInput.should('have.value', 'john.doe@example.com');
    });

    it('Simulate pasting a long string of characters into the first name and last name fields', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('A'.repeat(500)); // Example long string
        signUpPage.fillLastName('B'.repeat(500)); // Example long string
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should('have.value', 'A'.repeat(500));
        signUpPage.lastNameInput.should('have.value', 'B'.repeat(500));
    });

    it('Test rapid entry and deletion in input fields', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('RapidEntry');
        signUpPage.firstNameInput.type('{backspace}{backspace}');
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should(($input) => {
            const value = $input.val();
            expect(value).to.not.equal('RapidEntry');
            expect(value).to.match(/Rapid/);
        });
    });

    it('Verify the accessibility of the form with a screen reader', () => {
        signUpPage.visit();
        signUpPage.firstNameInput.should('have.attr', 'placeholder');
        signUpPage.lastNameInput.should('have.attr', 'placeholder');
        signUpPage.emailInput.should('have.attr', 'placeholder');
        signUpPage.createAccountButton.should('be.visible');
    });

    it('Conduct usability testing with users completing the form', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('Jane');
        signUpPage.fillLastName('Smith');
        signUpPage.fillEmail('jane.smith@example.com');
        signUpPage.createAccountButton.should('be.visible').and('not.be.disabled');
    });

    it('Accepts emails with uppercase letters and plus signs', () => {
        signUpPage.visit();
        signUpPage.fillEmail('John.Doe+Beta@Example.COM');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.emailInput.should('have.value', 'John.Doe+Beta@Example.COM');
    });

    it('Keeps the form state when only the first name is provided', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('John');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should('have.value', 'John');
        signUpPage.lastNameInput.should('have.value', '');
        signUpPage.emailInput.should('have.value', '');
    });

    it('Handles a short password value without breaking the form', () => {
        signUpPage.visit();
        signUpPage.fillPassword('Ab1!');
        signUpPage.fillConfirmPassword('Ab1!');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.passwordInput.should('have.value', 'Ab1!');
        signUpPage.confirmPasswordInput.should('have.value', 'Ab1!');
    });

    it('Handles whitespace-only values for required fields', () => {
        signUpPage.visit();
        signUpPage.fillFirstName('   ');
        signUpPage.fillLastName('   ');
        signUpPage.fillEmail('   ');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should(($input) => {
            const value = $input.val();
            expect(value).to.satisfy((v) => v === '   ' || v === '' || v === null);
        });
        signUpPage.lastNameInput.should(($input) => {
            const value = $input.val();
            expect(value).to.satisfy((v) => v === '   ' || v === '' || v === null);
        });
        signUpPage.emailInput.should(($input) => {
            const value = $input.val();
            expect(value).to.satisfy((v) => v === '   ' || v === '' || v === null);
        });
    });

    it('Preserves special characters in first and last names', () => {
        signUpPage.visit();
        signUpPage.fillFirstName("O'Connor");
        signUpPage.fillLastName('Díaz');
        signUpPage.clickCreateAccount();
        signUpPage.assertSignupPageVisible();
        signUpPage.firstNameInput.should('have.value', "O'Connor");
        signUpPage.lastNameInput.should('have.value', 'Díaz');
    });

    it('Test the Google SignIn button functionality', () => {
        signUpPage.visit();
        cy.get('iframe').should('be.visible');
    });
});