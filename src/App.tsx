import React, { useEffect, useState } from "react";
import axios from "axios";
import { CNBData } from "./types";
import { parseCNBData } from "./utils/parseCNBData";
import { getCzkAmountFromRate } from "./utils/getCzkAmountFromRate";
import {
  AppContainer,
  AppHeader,
  AppTitle,
  LoadingText,
  ErrorContainer,
  ConverterForm,
  FormTitle,
  FormGroup,
  FormLabel,
  AmountInput,
  CurrencySelect,
  CalculateButton,
  ResultContainer,
  ConversionResult,
  ResultTitle,
  ResultDisplay,
  AmountFrom,
  AmountTo,
  EqualsSymbol,
  RateInfo,
  ExchangeRatesSection,
  ExchangeRatesTitle,
  SerialNumber,
  CurrencyGrid,
  CurrencyCard,
  CurrencyCardTitle,
  CurrencyCardInfo,
  CurrencyRateInfo,
} from "./components/StyledComponents";

function App() {
  const [exchangeData, setExchangeData] = useState<CNBData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

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

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    setIsCalculated(false); // Reset calculation when currency changes
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    setIsCalculated(false); // Reset calculation when amount changes
  };

  const handleCalculate = () => {
    if (!selected || !exchangeData) {
      alert("Please select a currency first");
      return;
    }

    const result = getCzkAmountFromRate(selected, amount, exchangeData.rates);
    setConvertedAmount(result);
    setIsCalculated(true);
  };

  const getSelectedCurrencyInfo = () => {
    if (!selected || !exchangeData) return null;
    return exchangeData.rates.find((rate) => rate.code === selected);
  };

  return (
    <AppContainer>
      <AppHeader>
        <AppTitle>Czech National Bank Exchange Rates</AppTitle>

        {loading && <LoadingText>Loading exchange rates...</LoadingText>}

        {!loading && exchangeData && (
          <ConverterForm>
            <FormTitle>Currency Converter</FormTitle>
            <FormGroup>
              <FormLabel htmlFor="amount">
                Amount to be converted to CZK:
              </FormLabel>
              <AmountInput
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="currency">From Currency:</FormLabel>
              <CurrencySelect
                id="currency"
                name="select"
                onChange={handleChangeSelect}
                value={selected || ""}
              >
                <option value="" disabled>
                  Select a currency
                </option>
                {exchangeData.rates.map((rate) => (
                  <option value={rate.code} key={rate.code}>
                    {rate.code} - {rate.country} ({rate.currency})
                  </option>
                ))}
              </CurrencySelect>
            </FormGroup>

            <CalculateButton
              onClick={handleCalculate}
              disabled={!selected || amount <= 0}
            >
              Convert to CZK
            </CalculateButton>

            {isCalculated && convertedAmount !== null && selected && (
              <ResultContainer>
                <ConversionResult>
                  <ResultTitle>Conversion Result</ResultTitle>
                  <ResultDisplay>
                    <AmountFrom>
                      {amount.toLocaleString()} {selected}
                    </AmountFrom>
                    <EqualsSymbol>=</EqualsSymbol>
                    <AmountTo>
                      {convertedAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      CZK
                    </AmountTo>
                  </ResultDisplay>
                  {getSelectedCurrencyInfo() && (
                    <RateInfo>
                      Exchange rate: 1 {selected} ={" "}
                      {(
                        getSelectedCurrencyInfo()!.rate /
                        getSelectedCurrencyInfo()!.amount
                      ).toFixed(4)}{" "}
                      CZK
                    </RateInfo>
                  )}
                </ConversionResult>
              </ResultContainer>
            )}
          </ConverterForm>
        )}

        {error && (
          <ErrorContainer>
            <p>Error: {error}</p>
          </ErrorContainer>
        )}

        {exchangeData && (
          <ExchangeRatesSection>
            <ExchangeRatesTitle>
              Exchange Rates for {exchangeData.date}
            </ExchangeRatesTitle>
            <SerialNumber>
              Serial Number: #{exchangeData.serialNumber}
            </SerialNumber>

            <CurrencyGrid>
              {exchangeData.rates.map((rate, index) => (
                <CurrencyCard key={index}>
                  <CurrencyCardTitle>
                    {rate.code} - {rate.country}
                  </CurrencyCardTitle>
                  <CurrencyCardInfo>
                    <strong>Currency:</strong> {rate.currency}
                  </CurrencyCardInfo>
                  <CurrencyCardInfo>
                    <strong>Rate:</strong>{" "}
                    {(rate.rate / rate.amount).toFixed(3)} CZK
                  </CurrencyCardInfo>
                  <CurrencyRateInfo>
                    1 {rate.code} = {(rate.rate / rate.amount).toFixed(3)} CZK
                  </CurrencyRateInfo>
                </CurrencyCard>
              ))}
            </CurrencyGrid>
          </ExchangeRatesSection>
        )}
      </AppHeader>
    </AppContainer>
  );
}

export default App;
