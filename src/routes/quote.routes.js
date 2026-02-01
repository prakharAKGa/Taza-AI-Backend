const express = require('express');
const router = express.Router();

const {
  getQuotesByCategory,
  getCategories,
} = require('../controllers/quote.controller');


router.get('/categories', getCategories);
router.get('/', getQuotesByCategory);

module.exports = router;
