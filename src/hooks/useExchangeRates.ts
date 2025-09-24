import { useEffect, useState } from "react";
import axios from "axios";
import { CNBData } from "../types";
import { parseCNBData } from "../utils/parseCNBData";

export const useExchangeRates = () => {
  const [exchangeData, setExchangeData] = useState<CNBData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Using a CORS proxy to bypass CORS restrictions
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
    );

    axios
      .get(proxyUrl + targetUrl)
      .then((res) => {
        // The actual data will be in res.data.contents
        const textData = res.data.contents;
        try {
          const parsedData = parseCNBData(textData);
          setExchangeData(parsedData);
          setError(null);
        } catch (parseError) {
          setError("Failed to parse exchange rate data");
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setError("Failed to fetch exchange rate data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { exchangeData, loading, error };
};
