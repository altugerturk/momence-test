import { getCzkAmountFromRate } from "../utils/getCzkAmountFromRate";
import { ExchangeRate } from "../types";

describe("getCzkAmountFromRate", () => {
  const validExchangeData: ExchangeRate[] = [
    {
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 13.693,
    },
    {
      country: "Brazil",
      currency: "real",
      amount: 1,
      code: "BRL",
      rate: 3.819,
    },
    {
      country: "Bulgaria",
      currency: "lev",
      amount: 1,
      code: "BGN",
      rate: 12.437,
    },
    {
      country: "Canada",
      currency: "dollar",
      amount: 1,
      code: "CAD",
      rate: 14.999,
    },
    {
      country: "China",
      currency: "renminbi",
      amount: 1,
      code: "CNY",
      rate: 2.909,
    },
    {
      country: "Denmark",
      currency: "krone",
      amount: 1,
      code: "DKK",
      rate: 3.258,
    },
    {
      country: "EMU",
      currency: "euro",
      amount: 1,
      code: "EUR",
      rate: 24.325,
    },
    {
      country: "Hongkong",
      currency: "dollar",
      amount: 1,
      code: "HKD",
      rate: 2.66,
    },
    {
      country: "Hungary",
      currency: "forint",
      amount: 100,
      code: "HUF",
      rate: 6.184,
    },
    {
      country: "Iceland",
      currency: "krona",
      amount: 100,
      code: "ISK",
      rate: 16.963,
    },
    {
      country: "IMF",
      currency: "SDR",
      amount: 1,
      code: "XDR",
      rate: 28.4,
    },
    {
      country: "India",
      currency: "rupee",
      amount: 100,
      code: "INR",
      rate: 23.491,
    },
    {
      country: "Indonesia",
      currency: "rupiah",
      amount: 1000,
      code: "IDR",
      rate: 1.257,
    },
    {
      country: "Israel",
      currency: "new shekel",
      amount: 1,
      code: "ILS",
      rate: 6.202,
    },
    {
      country: "Japan",
      currency: "yen",
      amount: 100,
      code: "JPY",
      rate: 14.11,
    },
    {
      country: "Malaysia",
      currency: "ringgit",
      amount: 1,
      code: "MYR",
      rate: 4.925,
    },
    {
      country: "Mexico",
      currency: "peso",
      amount: 1,
      code: "MXN",
      rate: 1.112,
    },
    {
      country: "New Zealand",
      currency: "dollar",
      amount: 1,
      code: "NZD",
      rate: 12.325,
    },
    {
      country: "Norway",
      currency: "krone",
      amount: 1,
      code: "NOK",
      rate: 2.078,
    },
    {
      country: "Philippines",
      currency: "peso",
      amount: 100,
      code: "PHP",
      rate: 36.408,
    },
    {
      country: "Poland",
      currency: "zloty",
      amount: 1,
      code: "PLN",
      rate: 5.716,
    },
    {
      country: "Romania",
      currency: "leu",
      amount: 1,
      code: "RON",
      rate: 4.794,
    },
    {
      country: "Singapore",
      currency: "dollar",
      amount: 1,
      code: "SGD",
      rate: 16.164,
    },
    {
      country: "South Africa",
      currency: "rand",
      amount: 1,
      code: "ZAR",
      rate: 1.184,
    },
    {
      country: "South Korea",
      currency: "won",
      amount: 100,
      code: "KRW",
      rate: 1.494,
    },
    {
      country: "Sweden",
      currency: "krona",
      amount: 1,
      code: "SEK",
      rate: 2.211,
    },
    {
      country: "Switzerland",
      currency: "franc",
      amount: 1,
      code: "CHF",
      rate: 26.072,
    },
    {
      country: "Thailand",
      currency: "baht",
      amount: 100,
      code: "THB",
      rate: 65.384,
    },
    {
      country: "Turkey",
      currency: "lira",
      amount: 100,
      code: "TRY",
      rate: 50.182,
    },
    {
      country: "United Kingdom",
      currency: "pound",
      amount: 1,
      code: "GBP",
      rate: 28.083,
    },
    {
      country: "USA",
      currency: "dollar",
      amount: 1,
      code: "USD",
      rate: 20.713,
    },
  ];

  it("should return the correct CZK amount for a valid currency", () => {
    const result = getCzkAmountFromRate("AUD", 1, validExchangeData);
    expect(result).toBe(13.693);
  });

  it("should throw an error for an invalid currency", () => {
    expect(() => getCzkAmountFromRate("INVALID", 1, validExchangeData)).toThrow(
      "Invalid currency code"
    );
  });

  it("should throw an error for an invalid input parameters", () => {
    expect(() => getCzkAmountFromRate("AUD", 1, [])).toThrow(
      "Invalid input parameters"
    );
  });
});
