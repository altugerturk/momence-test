// src/__tests__/parseCNBData.test.ts

import { parseCNBData } from "../utils/parseCNBData";
import { CNBData } from "../types";

describe("parseCNBData", () => {
  const validCNBData = `30 Dec 2024 #250
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
EMU|euro|1|EUR|25.405
United Kingdom|pound|1|GBP|30.125
USA|dollar|1|USD|24.365`;

  const validCNBDataWithMultipleAmounts = `30 Dec 2024 #250
Country|Currency|Amount|Code|Rate
Japan|yen|100|JPY|16.789
South Korea|won|100|KRW|1.723`;

  it("should parse valid CNB data correctly", () => {
    const result: CNBData = parseCNBData(validCNBData);

    expect(result.date).toBe("30 Dec 2024");
    expect(result.serialNumber).toBe(250);
    expect(result.rates).toHaveLength(4);

    // Test first rate
    expect(result.rates[0]).toEqual({
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 15.234,
    });

    // Test last rate
    expect(result.rates[3]).toEqual({
      country: "USA",
      currency: "dollar",
      amount: 1,
      code: "USD",
      rate: 24.365,
    });
  });

  it("should parse data with different amount values correctly", () => {
    const result: CNBData = parseCNBData(validCNBDataWithMultipleAmounts);

    expect(result.rates[0]).toEqual({
      country: "Japan",
      currency: "yen",
      amount: 100,
      code: "JPY",
      rate: 16.789,
    });
  });

  it("should throw error for invalid header format", () => {
    const invalidHeaderData = `Invalid header format
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234`;

    expect(() => parseCNBData(invalidHeaderData)).toThrow(
      "Invalid CNB data format"
    );
  });

  it("should throw error for missing serial number", () => {
    const noSerialData = `30 Dec 2024
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234`;

    expect(() => parseCNBData(noSerialData)).toThrow("Invalid CNB data format");
  });

  it("should handle empty rates data", () => {
    const emptyRatesData = `30 Dec 2024 #250
Country|Currency|Amount|Code|Rate`;

    const result: CNBData = parseCNBData(emptyRatesData);

    expect(result.date).toBe("30 Dec 2024");
    expect(result.serialNumber).toBe(250);
    expect(result.rates).toHaveLength(0);
  });

  it("should skip malformed rate lines", () => {
    const malformedData = `30 Dec 2024 #250
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
Invalid|line|format
USA|dollar|1|USD|24.365`;

    const result: CNBData = parseCNBData(malformedData);

    expect(result.rates).toHaveLength(2);
    expect(result.rates[0].code).toBe("AUD");
    expect(result.rates[1].code).toBe("USD");
  });

  it("should handle extra whitespace in data", () => {
    const dataWithWhitespace = `  30 Dec 2024 #250  
Country|Currency|Amount|Code|Rate
  Australia|dollar|1|AUD|15.234  
  
USA|dollar|1|USD|24.365  `;

    const result: CNBData = parseCNBData(dataWithWhitespace);

    expect(result.date).toBe("30 Dec 2024");
    expect(result.rates).toHaveLength(2);
  });

  it("should parse numeric values correctly", () => {
    const result: CNBData = parseCNBData(validCNBData);

    // Test that amounts are parsed as integers
    expect(typeof result.rates[0].amount).toBe("number");
    expect(result.rates[0].amount).toBe(1);

    // Test that rates are parsed as floats
    expect(typeof result.rates[0].rate).toBe("number");
    expect(result.rates[0].rate).toBe(15.234);

    // Test serial number is parsed as integer
    expect(typeof result.serialNumber).toBe("number");
    expect(result.serialNumber).toBe(250);
  });

  it("should handle different date formats", () => {
    const differentDateFormat = `01 Jan 2025 #001
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234`;

    const result: CNBData = parseCNBData(differentDateFormat);

    expect(result.date).toBe("01 Jan 2025");
    expect(result.serialNumber).toBe(1);
  });
});
