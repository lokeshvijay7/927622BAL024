# Stock Price Aggregation Microservice

A Node.js + Express microservice to fetch real-time stock insights using average price and correlation over the last "m" minutes.

This project is built as part of a full-stack developer assessment for Affordmed.

---

##  Features

 Get average stock price for the last `m` minutes  
 Calculate Pearson correlation between 2 stock tickers  
 Clean JSON response as per test format  
 No login or authentication required  
 In-memory or mocked stock data simulation  
 Optimized for test constraints (no extra API calls)

---

## Endpoints

### 1. Average Stock Price
**GET** `/stocks/:ticker?minutes=m&aggregation=average`

**Response:**
```json
{
  "averageStockPrice": 453.569744,
  "priceHistory": [
    {
      "price": 231.95296,
      "lastUpdatedAt": "2025-05-08T04:26:27.4658491Z"
    },
    ...
  ]
}
