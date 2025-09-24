// src/__tests__/HomePage.integration.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { HomePage } from "../pages/HomePage";
import fs from "fs";
import path from "path";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("HomePage Integration Tests", () => {
  // Load mock data from file
  const mockCNBData = fs.readFileSync(
    path.join(__dirname, "__fixtures__", "cnb-sample-data.txt"),
    "utf-8"
  );

  const mockCNBResponse = {
    data: {
      contents: mockCNBData,
    },
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should complete full currency conversion workflow", async () => {
    // Mock successful API response
    mockedAxios.get.mockResolvedValue(mockCNBResponse);

    render(<HomePage />);

    // 1. Initially shows loading
    expect(screen.getByText("Loading exchange rates...")).toBeInTheDocument();

    // 2. Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    });

    // 3. Check that currencies are populated
    const currencySelect = screen.getByLabelText("From Currency:");
    expect(currencySelect).toBeInTheDocument();

    // 4. Select a currency (USD)
    fireEvent.change(currencySelect, { target: { value: "USD" } });
    expect(currencySelect).toHaveValue("USD");

    // 5. Enter an amount
    const amountInput = screen.getByLabelText("Amount to be converted to CZK:");
    fireEvent.change(amountInput, { target: { value: "100" } });
    expect(amountInput).toHaveValue(100);

    // 6. Click convert button
    const convertButton = screen.getByText("Convert to CZK");
    expect(convertButton).not.toBeDisabled();
    fireEvent.click(convertButton);

    // 7. Check conversion result
    await waitFor(() => {
      expect(screen.getByText("Conversion Result")).toBeInTheDocument();
    });

    expect(screen.getByText("100 USD")).toBeInTheDocument();
    expect(screen.getByText(/2,071\.30 CZK/)).toBeInTheDocument();
  });

  it("should handle API failure gracefully", async () => {
    // Mock API failure
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    render(<HomePage />);

    // Wait for error to appear
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch exchange rate data")
      ).toBeInTheDocument();
    });

    // Form should not be visible
    expect(screen.queryByText("Currency Converter")).not.toBeInTheDocument();
  });

  it("should disable convert button when no currency selected", async () => {
    mockedAxios.get.mockResolvedValue(mockCNBResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    });

    const convertButton = screen.getByText("Convert to CZK");
    expect(convertButton).toBeDisabled();

    // Enter amount but no currency
    const amountInput = screen.getByLabelText("Amount to be converted to CZK:");
    fireEvent.change(amountInput, { target: { value: "100" } });

    expect(convertButton).toBeDisabled();
  });

  it("should reset calculation when currency changes", async () => {
    mockedAxios.get.mockResolvedValue(mockCNBResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    });

    // Select currency and convert
    const currencySelect = screen.getByLabelText("From Currency:");
    fireEvent.change(currencySelect, { target: { value: "USD" } });

    const amountInput = screen.getByLabelText("Amount to be converted to CZK:");
    fireEvent.change(amountInput, { target: { value: "100" } });

    const convertButton = screen.getByText("Convert to CZK");
    fireEvent.click(convertButton);

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText("Conversion Result")).toBeInTheDocument();
    });

    // Change currency
    fireEvent.change(currencySelect, { target: { value: "EUR" } });

    // Result should disappear
    expect(screen.queryByText("Conversion Result")).not.toBeInTheDocument();
  });

  it("should handle currencies with different amount bases correctly", async () => {
    mockedAxios.get.mockResolvedValue(mockCNBResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    });

    // Select JPY which has amount=100 in the fixture
    const currencySelect = screen.getByLabelText("From Currency:");
    fireEvent.change(currencySelect, { target: { value: "JPY" } });

    const amountInput = screen.getByLabelText("Amount to be converted to CZK:");
    fireEvent.change(amountInput, { target: { value: "1000" } });

    const convertButton = screen.getByText("Convert to CZK");
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText("Conversion Result")).toBeInTheDocument();
    });

    // JPY rate is 14.110 for 100 JPY, so 1000 JPY = 141.10 CZK
    expect(screen.getByText("1,000 JPY")).toBeInTheDocument();
    expect(screen.getByText(/141\.10 CZK/)).toBeInTheDocument();
  });

  it("should display exchange rates data correctly", async () => {
    mockedAxios.get.mockResolvedValue(mockCNBResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    });

    // Check that the exchange rates section is displayed
    expect(
      screen.getByText("Exchange Rates for 09 Sep 2025")
    ).toBeInTheDocument();
    expect(screen.getByText("Serial Number: #175")).toBeInTheDocument();

    // Check that some currencies are displayed in the grid
    expect(screen.getByText("USD - USA")).toBeInTheDocument();
    expect(screen.getByText("EUR - EMU")).toBeInTheDocument();
    expect(screen.getByText("JPY - Japan")).toBeInTheDocument();
  });

  it("should handle malformed API data gracefully", async () => {
    // Mock response with invalid data format
    const invalidResponse = {
      data: {
        contents: "Invalid data format without proper headers",
      },
    };

    mockedAxios.get.mockResolvedValue(invalidResponse);

    render(<HomePage />);

    // Wait for error to appear
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to parse exchange rate data")
      ).toBeInTheDocument();
    });

    // Form should not be visible
    expect(screen.queryByText("Currency Converter")).not.toBeInTheDocument();
  });
});
