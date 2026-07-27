const { defineConfig } = require("cypress");

module.exports = defineConfig({
<<<<<<< HEAD
  e2e: {
    baseUrl: "https://app.clientshot.com",

    viewportWidth: 1366,
    viewportHeight: 768,

    // Read-only production run: keep test data creation OFF by default.
    // Individual specs can override this via Cypress.env('allowWrites')
    env: {
      allowWrites: false,
    },

    retries: {
      runMode: 2,   // retry flaky failures in CI/headless
      openMode: 0,
    },

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // place plugin/event hooks here as the suite grows
      return config;
    },
  },
});
=======

    e2e: {

        baseUrl: "https://app.clientshot.com",

        env: {

            qaUserEmail: "YOUR_EMAIL",

            qaUserPassword: "YOUR_PASSWORD",

            allowWrites: false,

        },

        viewportWidth: 1366,

        viewportHeight: 768,

        defaultCommandTimeout: 10000,

        pageLoadTimeout: 30000,

        retries: {
            runMode: 2,
            openMode: 0,
        },

        setupNodeEvents(on, config) {

            return config;

        }

    }

});
>>>>>>> b29760a (Add Cypress smoke test scripts)
