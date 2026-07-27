class DashboardPage {

    get totalComplaints() {
        return cy.get(".chart-number").first();
    }

    get averageRating() {
        return cy.get(".Bold-secondary-header-500").eq(1);
    }

    get netPromoterScore() {
        return cy.get(".chart-number").eq(1);
    }

    get notificationCount() {
        return cy.get(".notification-text");
    }

    get filterOptions() {
        return cy.get(".filter-button");
    }

    get viewAllLink() {
        return cy.contains("View all");
    }

    get settingsButton() {
        return cy.get(".settings-button");
    }

    get feedbackSection() {
        return cy.get(".feedback-body");
    }

    get noResultsMessage() {
        return cy.get(".empty-list");
    }

    openSettings() {
        this.settingsButton.click();
    }

    clickViewAll() {
        this.viewAllLink.click();
    }

    openFilter(option) {
        this.filterOptions.contains(option).click();
    }

    checkNoNotifications() {
        this.notificationCount.should("contain", "0");
    }
}


const dashboardPage = new DashboardPage();


describe("Dashboard Tests", () => {

    before(() => {
        cy.loginAsQaUser();
        cy.url().should("include", "/dashboard");
    });


    it("Verify dashboard functionality ", () => {

        // Verify Total Complaints
        dashboardPage.totalComplaints
            .should("be.visible")
            .invoke("text")
            .then(text => {
                const value = parseFloat(text.replace(/,/g, ""));

                expect(value).to.be.a("number");
                expect(value).to.be.gte(0);
            });


        // Verify Net Promoter Score
        dashboardPage.netPromoterScore
            .should("be.visible")
            .invoke("text")
            .then(text => {
                const value = parseFloat(text.replace(/,/g, ""));

                expect(value).to.be.a("number");
                expect(value).to.be.gte(0);
            });


        // Verify Average Rating
        dashboardPage.averageRating
            .should("be.visible")
            .invoke("text")
            .then(text => {
                const value = parseFloat(text.trim());

                cy.log("Average Rating:", value);

                expect(value).to.be.a("number");
                expect(value).to.be.gte(0);
            });


        // Verify Dashboard features are interactive
        cy.get("div.Inactive")
            .click();

        cy.get("div.Inactive div.text")
            .click();

        cy.get('svg[xmlns="http://www.w3.org/2000/svg"]')
            .click()
            .click()
            .click();

        cy.get("div.items-center.justify-center")
            .click();

        dashboardPage.openSettings();

        cy.get("img.cursor-pointer")
            .click();

        cy.get("div.select-box img")
            .click();

        cy.get('img[alt="cons"]')
            .click();

        cy.get("#drop-down-title span:nth-child(3) img")
            .click()
            .click();

        cy.verifyNoErrorModal();

    });

});