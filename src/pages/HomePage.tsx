import React from "react";
import { useExchangeRates } from "../hooks";
import { CurrencyConverter } from "../components/CurrencyConverter";
import { ExchangeRates } from "../components/ExchangeRates";
import {
  AppContainer,
  AppHeader,
  AppTitle,
  LoadingText,
  ErrorContainer,
} from "../components/StyledComponents";

export const HomePage: React.FC = () => {
  const { exchangeData, loading, error } = useExchangeRates();

  return (
    <AppContainer>
      <AppHeader>
        <AppTitle>Czech National Bank Exchange Rates</AppTitle>

        {loading && <LoadingText>Loading exchange rates...</LoadingText>}

        {!loading && exchangeData && (
          <>
            <CurrencyConverter exchangeData={exchangeData} />
            <ExchangeRates exchangeData={exchangeData} />
          </>
        )}

        {error && (
          <ErrorContainer>
            <p>Error: {error}</p>
          </ErrorContainer>
        )}
      </AppHeader>
    </AppContainer>
  );
};
