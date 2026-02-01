const Quote = require('../models/Quote');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getQuotesByCategory = catchAsync(async (req, res) => {
  const { category, page = 1, limit = 1 } = req.query;

  if (!category) {
    throw new AppError('Category is required', 400);
  }

  const quotes = await Quote.find({
    category,
    isActive: true,
  })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  if (quotes.length === 0) {
    throw new AppError('No quotes found', 404);
  }

  res.json({
    success: true,
    page: Number(page),
    quotes,
  });
});


exports.getCategories = (req, res) => {
  res.json({
    success: true,
    categories: [
      { key: 'GOOD_MORNING', label: 'सुप्रभात' },
      { key: 'MOTIVATIONAL', label: 'प्रेरणादायक' },
      { key: 'SHAYARI', label: 'शायरी' },
      { key: 'RELIGIOUS', label: 'धार्मिक' },
      { key: 'LOVE', label: 'प्रेम' },
      { key: 'FESTIVAL', label: 'त्योहार' },
    ],
  });
};
