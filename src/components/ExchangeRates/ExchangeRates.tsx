import React from "react";
import { CNBData } from "../../types";
import {
  ExchangeRatesSection,
  ExchangeRatesTitle,
  SerialNumber,
  CurrencyGrid,
  CurrencyCard,
  CurrencyCardTitle,
  CurrencyCardInfo,
  CurrencyRateInfo,
} from "../StyledComponents";

interface ExchangeRatesProps {
  exchangeData: CNBData;
}

export const ExchangeRates: React.FC<ExchangeRatesProps> = ({
  exchangeData,
}) => {
  return (
    <ExchangeRatesSection>
      <ExchangeRatesTitle>
        Exchange Rates for {exchangeData.date}
      </ExchangeRatesTitle>
      <SerialNumber>Serial Number: #{exchangeData.serialNumber}</SerialNumber>

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
              <strong>Rate:</strong> {(rate.rate / rate.amount).toFixed(3)} CZK
            </CurrencyCardInfo>
            <CurrencyRateInfo>
              1 {rate.code} = {(rate.rate / rate.amount).toFixed(3)} CZK
            </CurrencyRateInfo>
          </CurrencyCard>
        ))}
      </CurrencyGrid>
    </ExchangeRatesSection>
  );
};
