import styled, { keyframes, css } from "styled-components";

// Keyframes animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Main App Container
export const AppContainer = styled.div`
  text-align: center;
`;

// App Header
export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: calc(10px + 2vmin);
  color: white;

  @media (max-width: 768px) {
    font-size: calc(8px + 2vmin);
    padding: 10px;
  }
`;

// Main Title
export const AppTitle = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

// Loading Text
export const LoadingText = styled.p`
  color: #61dafb;
  font-size: 1.2rem;
`;

// Error Container
export const ErrorContainer = styled.div`
  color: red;
  margin: 20px 0;

  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;

// Converter Form Container
export const ConverterForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin: 20px auto;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 10px;
    padding: 20px;
  }
`;

// Form Title
export const FormTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 600;
`;

// Form Group
export const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

// Form Label
export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #e0e0e0;
  font-weight: 500;
  font-size: 1rem;
`;

// Shared input styles
const inputStyles = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #61dafb;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.2);
  }
`;

// Amount Input
export const AmountInput = styled.input`
  ${inputStyles}

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

// Currency Select
export const CurrencySelect = styled.select`
  ${inputStyles}

  option {
    background: #282c34;
    color: white;
  }
`;

// Calculate Button
export const CalculateButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, #61dafb, #21a9ce);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #21a9ce, #1a8cb8);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(97, 218, 251, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Result Container
export const ResultContainer = styled.div`
  margin-top: 25px;
  animation: ${slideIn} 0.4s ease-out;
`;

// Conversion Result
export const ConversionResult = styled.div`
  background: rgba(97, 218, 251, 0.1);
  border: 2px solid rgba(97, 218, 251, 0.3);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
`;

// Result Title
export const ResultTitle = styled.h3`
  color: #61dafb;
  margin-bottom: 15px;
  font-size: 1.3rem;
`;

// Result Display
export const ResultDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Amount Display (shared styles)
const amountStyles = css`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
`;

// Amount From
export const AmountFrom = styled.span`
  ${amountStyles}
  color: #ffd700;
`;

// Amount To
export const AmountTo = styled.span`
  ${amountStyles}
  color: #61dafb;
`;

// Equals Symbol
export const EqualsSymbol = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #61dafb;
`;

// Rate Info
export const RateInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-style: italic;
`;

// Exchange Rates Section
export const ExchangeRatesSection = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 20px auto;
`;

// Exchange Rates Title
export const ExchangeRatesTitle = styled.h2`
  color: white;
  margin-bottom: 10px;
`;

// Serial Number
export const SerialNumber = styled.p`
  color: #e0e0e0;
  margin-bottom: 20px;
`;

// Currency Grid
export const CurrencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

// Currency Card
export const CurrencyCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Currency Card Title
export const CurrencyCardTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #61dafb;
  font-size: 1.1rem;
`;

// Currency Card Info
export const CurrencyCardInfo = styled.p`
  margin: 5px 0;
  color: #e0e0e0;

  strong {
    color: white;
  }
`;

// Currency Rate Info
export const CurrencyRateInfo = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  color: #ccc;
`;

// App Logo (if needed)
export const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoSpin} infinite 20s linear;
  }
`;

// App Link
export const AppLink = styled.a`
  color: #61dafb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
