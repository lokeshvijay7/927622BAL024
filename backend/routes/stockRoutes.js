const express = require('express');
const router = express.Router();
const { getStockAverage, getStockCorrelation } = require('../controllers/stockController');

router.get('/stocks/:ticker', getStockAverage);

router.get('/stockcorrelation', getStockCorrelation);

module.exports = router;
