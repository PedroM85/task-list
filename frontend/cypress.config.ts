import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    // tsConfig: 'tsconfig.cypress.json', // <--- esto es clave
    setupNodeEvents(on, config) {
      // ...
    },
  },
});
