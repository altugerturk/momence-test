# Czech National Bank Currency Converter

A React-based currency converter that fetches real-time exchange rates from the Czech National Bank (CNB) and provides seamless currency conversion functionality.

## 🌟 Features

- **Real-time Exchange Rates**: Fetches the latest currency exchange rates from CNB API
- **Interactive Currency Converter**: Convert any amount from foreign currencies to CZK
- **Comprehensive Currency Display**: View all available exchange rates in an organized grid
- **Single Page Application**: React Router for seamless navigation with fallback routing
- **Modular Architecture**: Clean component separation with custom hooks and organized folder structure
- **Input Validation**: Prevents invalid inputs and provides user feedback
- **Error Handling**: Graceful handling of API failures and malformed data
- **Responsive Design**: Clean, modern UI that works across different screen sizes
- **Type Safety**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router DOM for SPA navigation
- **Styling**: Styled Components for component-level styling
- **HTTP Client**: Axios for API requests
- **State Management**: Custom React hooks for data fetching and state
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
├── __tests__/                    # Test files
│   ├── __fixtures__/              # Test data fixtures
│   ├── HomePage.integration.test.tsx
│   ├── getCzkAmountFromRate.test.ts
│   └── parseCNBData.test.ts
├── components/                   # Reusable UI components
│   ├── CurrencyConverter/         # Currency conversion component
│   │   ├── CurrencyConverter.tsx
│   │   └── index.ts
│   ├── ExchangeRates/            # Exchange rates display component
│   │   ├── ExchangeRates.tsx
│   │   └── index.ts
│   └── StyledComponents.ts       # All styled-components definitions
├── hooks/                        # Custom React hooks
│   ├── useExchangeRates.ts       # Exchange rates data fetching hook
│   └── index.ts
├── pages/                        # Page components
│   ├── HomePage.tsx              # Main application page
│   └── index.ts
├── types/                        # TypeScript type definitions
│   └── index.ts
├── utils/                        # Utility functions
│   ├── getCzkAmountFromRate.ts
│   └── parseCNBData.ts
├── App.tsx                       # Router configuration
└── index.tsx                     # Application entry point

cypress/
├── e2e/                          # End-to-end test files
│   └── currency-converter.cy.js
└── support/                      # Cypress support files
```

## 🔧 Key Components

### Application Architecture

#### Router Configuration (`App.tsx`)
Main application router setup:
- **Home Route (`/`)**: Displays the main currency converter page
- **Fallback Route (`*`)**: Redirects any unknown paths to home
- Clean separation of routing concerns from business logic

#### Custom Hooks (`hooks/`)
**`useExchangeRates`**: Custom hook for data management:
- Fetches exchange rate data from CNB API
- Manages loading, error, and success states
- Provides clean interface for components

#### Page Components (`pages/`)
**`HomePage`**: Main application page that:
- Orchestrates the overall page layout
- Integrates CurrencyConverter and ExchangeRates components
- Handles top-level state management

#### Feature Components (`components/`)
**`CurrencyConverter`**: Interactive conversion form:
- Currency selection dropdown
- Amount input with validation
- Real-time conversion results
- Exchange rate information display

**`ExchangeRates`**: Comprehensive rates display:
- Grid layout of all available currencies
- Country and currency information
- Current exchange rates

### Utility Functions

#### Data Parsing (`parseCNBData.ts`)
Converts the CNB's pipe-delimited text format into structured TypeScript objects:
- Extracts date and serial number from header
- Parses exchange rate data for each currency
- Handles data validation and error cases

#### Currency Conversion (`getCzkAmountFromRate.ts`)
Performs currency conversion calculations:
- Handles different base amounts (e.g., JPY uses base of 100)
- Validates input parameters
- Returns precise conversion results

#### Type Definitions (`types/index.ts`)
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
- **Unit Tests**: Critical utility functions (parseCNBData, getCzkAmountFromRate)
- **Integration Tests**: HomePage component with all interactions and API integration
- **E2E Tests**: Complete user workflows and edge cases with Cypress
- **Modular Testing**: Each component tested in isolation with proper mocking

## 🔍 Testing Coverage

The application includes comprehensive testing:

- **Utility Functions**: 100% coverage of core business logic
- **Component Integration**: Full user interaction workflows
- **Error Scenarios**: API failures and malformed data handling
- **Edge Cases**: Large amounts, different currency bases, input validation

## 📋 Requirements Compliance

✅ **React Application**: Built with Create React App and React 19  
✅ **React Router**: Single Page Application with routing and fallback redirects  
✅ **Currency Data Fetching**: Retrieves latest rates from CNB API via custom hooks  
✅ **Data Display**: Clear list of all exchange rates in organized components  
✅ **Currency Converter**: Interactive form with CZK conversion in dedicated component  
✅ **TypeScript**: Full TypeScript implementation with comprehensive typing  
✅ **Styled Components**: Component-level styling architecture  
✅ **Modular Architecture**: Clean separation of concerns with pages, components, and hooks  
✅ **Automated Testing**: Comprehensive test suite with Jest and Cypress  
✅ **Git History**: Progressive commits throughout development  

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## 🏛️ Architecture Improvements

### Recent Enhancements (v2.0)

**React Router Implementation**:
- Added React Router DOM for Single Page Application functionality
- Main route (`/`) displays the currency converter application
- Wildcard routing with automatic redirects to home page
- Clean separation of routing logic from business components

**Modular Architecture Refactoring**:
- **Component Separation**: Split monolithic App.tsx into focused components
- **Custom Hooks**: Extracted data fetching logic into `useExchangeRates` hook
- **Page Structure**: Implemented proper page/component hierarchy
- **Clean Imports**: Added barrel exports (index.ts files) for organized imports

**Improved Code Organization**:
- `pages/` - Top-level page components
- `components/` - Reusable UI components with feature-based folders
- `hooks/` - Custom React hooks for state and side effects
- `utils/` - Pure utility functions
- `types/` - TypeScript type definitions

**Testing Architecture**:
- Comprehensive integration tests for the main HomePage component
- Proper mocking strategies for external dependencies
- Maintained test coverage while improving code organization

### Benefits of New Architecture
1. **Maintainability**: Clear separation of concerns makes code easier to maintain
2. **Scalability**: Component-based structure allows easy addition of new features
3. **Reusability**: Modular components can be reused across different pages
4. **Testing**: Isolated components are easier to test and mock
5. **Developer Experience**: Clean imports and logical folder structure improve DX

## 🔮 Future Enhancements

### Potential Improvements
1. **Historical Data**: Add support for historical exchange rates
2. **Favorites**: Allow users to favorite frequently used currencies
3. **Offline Support**: Cache data for offline usage
4. **Multi-directional Conversion**: Support conversion between any two currencies
5. **Charts**: Add visual representation of rate trends
6. **PWA Features**: Transform into a Progressive Web App
7. **Additional Routes**: Add more pages (about, settings, history)
8. **URL Parameters**: Store conversion state in URL for bookmarking

### Technical Debt & Potential Improvements
1. **React Query**: Could migrate from custom hook to React Query for advanced caching
2. **Real-time Updates**: Add automatic data refresh capability
3. **Error Boundaries**: Implement React error boundaries for better error handling
4. **Lazy Loading**: Add code splitting for routes and components
5. **State Management**: Consider Redux or Zustand for complex state scenarios

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