# Stock Price Aggregation System - MERN Project

## Overview

This project is a Stock Price Aggregation System built with a Node.js + Express backend and a React frontend. It fetches real-time stock price data from a test server API and provides:

- Average stock price for a given ticker and time window.
- Correlation of price movement between two stocks.

## Backend

### Structure

- `server.js` - Express server setup.
- `routes/stockRoutes.js` - API route definitions.
- `controllers/stockController.js` - Business logic for API endpoints.
- `utils/stockUtils.js` - Utility functions for filtering, averaging, and correlation.
- `.gitignore` - Git ignore file.

### Setup and Run

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```
4. The server runs on `http://localhost:5000`.

### API Endpoints

- **GET /stocks/:ticker?minutes=m&aggregation=average**

  Returns the average stock price and price history for the last `m` minutes.

- **GET /stockcorrelation?minutes=m&ticker=XXX&ticker=YYY**

  Returns the correlation of price movement between two stocks.

## Frontend

### Structure

- React app located in `frontend/stock`.
- Pages:
  - `StockPage.jsx` - Input ticker and time, display stock price chart.
  - `CorrelationPage.jsx` - Input two tickers and time, display correlation and comparison chart.
- Uses Material UI and Chart.js for UI and charts.
- Axios for API calls.

### Setup and Run

1. Navigate to the frontend directory:
   ```
   cd frontend/stock
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
4. The app runs on `http://localhost:3000`.

## Testing

- Use Postman, curl, or browser to test backend endpoints.
- Use the React app UI to interact with the frontend pages.

## Notes

- The backend uses a Bearer token (from `token.txt`) for authorization when calling the test server API.
- The project is designed to be simple and efficient for placement test purposes.
- No dummy data is used; all data is fetched live from the test server API.

## Contact

For any issues or questions, please contact the developer.
