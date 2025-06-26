const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:5173',
    env: {
      BACKEND: `${process.env.BACKEND_baseUrl}/api` || 'http://localhost:3001/api'
    }
  },
});
