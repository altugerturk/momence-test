// TypeScript interface for exchange rate data
interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

interface CNBData {
  date: string;
  serialNumber: number;
  rates: ExchangeRate[];
}

export type { ExchangeRate, CNBData };
