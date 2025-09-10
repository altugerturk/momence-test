# Czech National Bank Currency Converter

A React-based currency converter that fetches real-time exchange rates from the Czech National Bank (CNB) and provides seamless currency conversion functionality.

## 🌟 Features

- **Real-time Exchange Rates**: Fetches the latest currency exchange rates from CNB API
- **Interactive Currency Converter**: Convert any amount from foreign currencies to CZK
- **Comprehensive Currency Display**: View all available exchange rates in an organized grid
- **Input Validation**: Prevents invalid inputs and provides user feedback
- **Error Handling**: Graceful handling of API failures and malformed data
- **Responsive Design**: Clean, modern UI that works across different screen sizes
- **Type Safety**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Styled Components for component-level styling
- **HTTP Client**: Axios for API requests
- **Testing**:
  - Jest & React Testing Library for unit/integration tests
  - Cypress for end-to-end testing
- **Development**: Create React App with modern React features
- **CORS Handling**: AllOrigins proxy service for cross-origin requests

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd momence-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Currency Conversion

1. **Wait for data to load**: The app automatically fetches the latest exchange rates on startup
2. **Enter amount**: Input the amount you want to convert in the number field
3. **Select currency**: Choose the source currency from the dropdown menu
4. **Convert**: Click "Convert to CZK" to see the result
5. **View result**: The converted amount and exchange rate information will be displayed

### Exchange Rates Overview

- All available currencies are displayed in a grid format
- Each currency card shows:
  - Country and currency name
  - Current exchange rate per unit
  - Three-letter currency code

## 🧪 Testing

### Unit & Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### End-to-End Tests

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run E2E tests with server
npm run e2e
```

## 🏗️ Project Structure

```
src/
├── __tests__/              # Test files
│   ├── __fixtures__/        # Test data fixtures
│   ├── App.integration.test.tsx
│   ├── getCzkAmountFromRate.test.ts
│   └── parseCNBData.test.ts
├── components/             # Styled components
│   └── StyledComponents.ts  # All styled-components definitions
├── types/                   # TypeScript type definitions
│   └── index.ts
├── utils/                   # Utility functions
│   ├── getCzkAmountFromRate.ts
│   └── parseCNBData.ts
├── App.tsx                  # Main application component
└── index.tsx               # Application entry point

cypress/
├── e2e/                     # End-to-end test files
│   └── currency-converter.cy.js
└── support/                 # Cypress support files
```

## 🔧 Key Components

### Data Parsing (`parseCNBData.ts`)
Converts the CNB's pipe-delimited text format into structured TypeScript objects:
- Extracts date and serial number from header
- Parses exchange rate data for each currency
- Handles data validation and error cases

### Currency Conversion (`getCzkAmountFromRate.ts`)
Performs currency conversion calculations:
- Handles different base amounts (e.g., JPY uses base of 100)
- Validates input parameters
- Returns precise conversion results

### Type Definitions (`types/index.ts`)
Provides TypeScript interfaces for:
- `ExchangeRate`: Individual currency data structure
- `CNBData`: Complete API response structure

## 🌐 API Information

**Data Source**: Czech National Bank
- **URL**: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
- **Format**: Pipe-delimited text file
- **Update Schedule**: Daily (business days)
- **CORS**: Handled via AllOrigins proxy service

## 🧩 Key Features Implementation

### Error Handling
- Network failure detection and user notification
- Malformed data parsing with graceful fallbacks
- Input validation for currency conversion

### User Experience
- Loading states during data fetching
- Disabled button states for invalid inputs
- Real-time form validation
- Clear conversion result display

### Testing Strategy
- **Unit Tests**: Critical utility functions
- **Integration Tests**: Component interactions and API integration
- **E2E Tests**: Complete user workflows and edge cases

## 🔍 Testing Coverage

The application includes comprehensive testing:

- **Utility Functions**: 100% coverage of core business logic
- **Component Integration**: Full user interaction workflows
- **Error Scenarios**: API failures and malformed data handling
- **Edge Cases**: Large amounts, different currency bases, input validation

## 📋 Requirements Compliance

✅ **React Application**: Built with Create React App and React 19  
✅ **Currency Data Fetching**: Retrieves latest rates from CNB API  
✅ **Data Display**: Clear list of all exchange rates  
✅ **Currency Converter**: Interactive form with CZK conversion  
✅ **TypeScript**: Full TypeScript implementation  
✅ **Styled Components**: Component-level styling architecture  
✅ **Automated Testing**: Comprehensive test suite with Jest and Cypress  
✅ **Git History**: Progressive commits throughout development  

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.


## 🔮 Future Enhancements

### Potential Improvements
1. **Historical Data**: Add support for historical exchange rates
2. **Favorites**: Allow users to favorite frequently used currencies
3. **Offline Support**: Cache data for offline usage
4. **Multi-directional Conversion**: Support conversion between any two currencies
5. **Charts**: Add visual representation of rate trends
6. **PWA Features**: Transform into a Progressive Web App

### Technical Debt & Missing Requirements
1. **React Query**: Uses Axios directly instead of React Query for data fetching
2. **Real-time Updates**: Add automatic data refresh capability
3. **Component Separation**: Could extract smaller reusable components

## 🤝 Development Notes

### CORS Handling
The CNB API doesn't include CORS headers, so the application uses the AllOrigins proxy service. In a production environment, you might want to:
- Set up your own proxy server
- Use a serverless function (Vercel, Netlify Functions)
- Implement server-side rendering

### Currency Base Amounts
Some currencies (like JPY) have different base amounts. The application correctly handles this by dividing the rate by the amount before conversion.

## 📄 License

This project is created as a technical assessment and is intended for evaluation purposes.

---

**Developed by**: Mustafa Altuğ Ertürk  
**Assessment for**: Momence Technical Interview  
**Date**: September 2025