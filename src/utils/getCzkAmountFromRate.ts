import { ExchangeRate } from "../types";

export const getCzkAmountFromRate = (
  code: string,
  amountToConvert: number,
  exchangeData: ExchangeRate[]
): number => {
  if (!code || !amountToConvert || !exchangeData || exchangeData.length === 0) {
    throw new Error("Invalid input parameters");
  }

  const exchangeRate = exchangeData.find((r) => r.code === code);

  if (!exchangeRate) {
    throw new Error("Invalid currency code");
  }

  return (exchangeRate.rate / exchangeRate.amount) * amountToConvert;
};
