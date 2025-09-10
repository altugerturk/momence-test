import { CNBData, ExchangeRate } from "../types";

// Function to parse CNB text format
export const parseCNBData = (textData: string): CNBData => {
  const lines = textData.trim().split("\n");

  // First line contains date and serial number
  // Format: "30 Dec 2024 #250"
  const headerLine = lines[0].trim();
  const dateMatch = headerLine.match(/^(.+) #(\d+)$/);

  if (!dateMatch) {
    throw new Error("Invalid CNB data format");
  }

  const date = dateMatch[1];
  const serialNumber = parseInt(dateMatch[2]);

  // Second line contains headers, skip it
  // Remaining lines contain exchange rate data
  const rates: ExchangeRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      // Format: "Country|Currency|Amount|Code|Rate"
      // Example: "Australia|dollar|1|AUD|15.234"
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length === 5) {
        rates.push({
          country: parts[0],
          currency: parts[1],
          amount: parseInt(parts[2]),
          code: parts[3],
          rate: parseFloat(parts[4]),
        });
      }
    }
  }

  return { date, serialNumber, rates };
};
