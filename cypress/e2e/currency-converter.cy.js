/// <reference types="cypress" />

describe("Currency Converter E2E Tests", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("/");
  });

  it("should load the application successfully", () => {
    // Test that the app loads and displays the main elements
    cy.contains("Czech National Bank Exchange Rates").should("be.visible");
    cy.waitForAppToLoad();
  });

  it("should complete full currency conversion workflow", () => {
    // Wait for app to load
    cy.waitForAppToLoad();

    // Select currency
    cy.get('select[name="select"]').select("USD");

    // Enter amount
    cy.get('input[type="number"]').type("{selectall}").type("100");

    // Click convert
    cy.contains("Convert to CZK").click();

    // Verify conversion result appears
    cy.contains("Conversion Result").should("be.visible");
    cy.contains("100 USD").should("be.visible");
    cy.contains("CZK").should("be.visible");

    // Verify exchange rate info is displayed
    cy.contains("Exchange rate: 1 USD =").should("be.visible");
  });

  it("should handle currency selection changes", () => {
    cy.waitForAppToLoad();

    // First conversion
    cy.get('select[name="select"]').select("USD");
    cy.get('input[type="number"]').type("{selectall}").type("50");
    cy.contains("Convert to CZK").click();
    cy.contains("Conversion Result").should("be.visible");

    // Change currency - result should disappear
    cy.get('select[name="select"]').select("EUR");
    cy.contains("Conversion Result").should("not.exist");

    // New conversion with EUR
    cy.contains("Convert to CZK").click();
    cy.contains("Conversion Result").should("be.visible");
    cy.contains("50 EUR").should("be.visible");
  });

  it("should disable convert button when no currency selected", () => {
    cy.waitForAppToLoad();

    // Button should be disabled initially
    cy.contains("Convert to CZK").should("be.disabled");

    // Enter amount but no currency
    cy.get('input[type="number"]').type("{selectall}").type("100");
    cy.contains("Convert to CZK").should("be.disabled");

    // Select currency - button should be enabled
    cy.get('select[name="select"]').select("USD");
    cy.contains("Convert to CZK").should("not.be.disabled");
  });

  it("should display exchange rates data correctly", () => {
    cy.waitForAppToLoad();

    // Check that exchange rates section is visible
    cy.contains("Exchange Rates for").should("be.visible");
    cy.contains("Serial Number:").should("be.visible");

    // Check that currency cards are displayed
    cy.contains("USD - USA").should("be.visible");
    cy.contains("EUR - EMU").should("be.visible");

    // Check that rates are displayed
    cy.contains("CZK").should("be.visible");
  });

  it("should handle amount input validation", () => {
    cy.waitForAppToLoad();

    cy.get('select[name="select"]').select("USD");

    // Test with zero amount
    cy.get('input[type="number"]').type("{selectall}").type("0");
    cy.contains("Convert to CZK").should("be.disabled");

    // Test with negative amount (if input allows it)
    cy.get('input[type="number"]').type("{selectall}").type("-10");
    cy.contains("Convert to CZK").should("be.disabled");

    // Test with valid amount
    cy.get('input[type="number"]').type("{selectall}").type("100");
    cy.contains("Convert to CZK").should("not.be.disabled");
  });

  it("should handle large amounts correctly", () => {
    cy.waitForAppToLoad();

    cy.get('select[name="select"]').select("USD");
    cy.get('input[type="number"]').type("{selectall}").type("999999");
    cy.contains("Convert to CZK").click();

    cy.contains("Conversion Result").should("be.visible");
    cy.contains("999,999 USD").should("be.visible");
  });

  it("should handle API errors gracefully", () => {
    // Intercept the API call and force it to fail
    cy.intercept("GET", "**/api.allorigins.win/**", {
      statusCode: 500,
      body: { error: "Server Error" },
    }).as("apiError");

    cy.visit("/");

    // Wait for the API call to fail
    cy.wait("@apiError");

    // Should show error message
    cy.contains("Error:", { timeout: 10000 }).should("be.visible");
    cy.contains("Failed to fetch exchange rate data").should("be.visible");

    // Form should not be visible
    cy.contains("Currency Converter").should("not.exist");
  });
});
