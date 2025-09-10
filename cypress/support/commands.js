// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for currency conversion workflow
Cypress.Commands.add("convertCurrency", (fromCurrency, amount) => {
  cy.get('[data-testid="currency-select"]').select(fromCurrency);
  cy.get('[data-testid="amount-input"]').clear().type(amount.toString());
  cy.get('[data-testid="convert-button"]').click();
});

// Custom command to wait for app to load
Cypress.Commands.add("waitForAppToLoad", () => {
  cy.contains("Loading exchange rates...").should("be.visible");
  cy.contains("Currency Converter", { timeout: 10000 }).should("be.visible");
});
