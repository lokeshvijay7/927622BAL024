const axios = require('axios');
const {
  filterPricesLastMinutes,
  calculateAverage,
  calculatePearsonCorrelation,
} = require('../utils/stockUtils');

const BASE_API_URL = 'http://20.244.56.144/evaluation-service';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY0Njc5LCJpYXQiOjE3NDgwNjQzNzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM3MTM5ZGJhLTlhZGQtNDRkMC1hOGRiLWExZGUyNDc2OTFiMCIsInN1YiI6IjkyNzYyMmJhbDAyNEBta2NlLmFjLmluIn0sImVtYWlsIjoiOTI3NjIyYmFsMDI0QG1rY2UuYWMuaW4iLCJuYW1lIjoibG9rZXNoIGsgdiIsInJvbGxObyI6IjkyNzYyMmJhbDAyNCIsImFjY2Vzc0NvZGUiOiJ3aGVRVXkiLCJjbGllbnRJRCI6IjM3MTM5ZGJhLTlhZGQtNDRkMC1hOGRiLWExZGUyNDc2OTFiMCIsImNsaWVudFNlY3JldCI6IkFCR1RRcVlOWWt6eHJBWmcifQ.W4PgMmBoJt2WGwXABAoc2TughauPM__TeEFZuR18-pY';

const getStockAverage = async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const minutes = parseInt(req.query.minutes) || 60;
    const aggregation = req.query.aggregation || 'average';

    if (aggregation !== 'average') {
      return res.status(400).json({ error: 'Unsupported aggregation type' });
    }

    const response = await axios.get(`${BASE_API_URL}/stocks/${ticker}?minutes=${minutes}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const priceHistoryRaw = response.data;

    if (!Array.isArray(priceHistoryRaw) || priceHistoryRaw.length === 0) {
      return res.status(404).json({ error: 'No price data found for ticker' });
    }

    const priceHistory = filterPricesLastMinutes(priceHistoryRaw, minutes);

    const averageStockPrice = calculateAverage(priceHistory);

    return res.json({
      averageStockPrice,
      priceHistory,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};

const getStockCorrelation = async (req, res) => {
  try {
    const minutes = parseInt(req.query.minutes) || 60;
    const tickers = req.query.ticker;

    if (!tickers || !Array.isArray(tickers) || tickers.length !== 2) {
      return res.status(400).json({ error: 'Please provide exactly two ticker parameters' });
    }

    const [ticker1, ticker2] = tickers.map(t => t.toUpperCase());

    const [resp1, resp2] = await Promise.all([
      axios.get(`${BASE_API_URL}/stocks/${ticker1}?minutes=${minutes}`, {
        headers: {
          Authorization: TOKEN,
        },
      }),
      axios.get(`${BASE_API_URL}/stocks/${ticker2}?minutes=${minutes}`, {
        headers: {
          Authorization: TOKEN,
        },
      }),
    ]);

    const priceHistory1Raw = resp1.data;
    const priceHistory2Raw = resp2.data;

    if (!Array.isArray(priceHistory1Raw) || !Array.isArray(priceHistory2Raw)) {
      return res.status(404).json({ error: 'Price data not found for one or both tickers' });
    }

    const priceHistory1 = filterPricesLastMinutes(priceHistory1Raw, minutes);
    const priceHistory2 = filterPricesLastMinutes(priceHistory2Raw, minutes);

    const averagePrice1 = calculateAverage(priceHistory1);
    const averagePrice2 = calculateAverage(priceHistory2);

    const correlation = calculatePearsonCorrelation(priceHistory1, priceHistory2);

    return res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: averagePrice1,
          priceHistory: priceHistory1,
        },
        [ticker2]: {
          averagePrice: averagePrice2,
          priceHistory: priceHistory2,
        },
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to fetch stock correlation data' });
  }
};

module.exports = {
  getStockAverage,
  getStockCorrelation,
};
