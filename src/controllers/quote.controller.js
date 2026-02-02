const Quote = require('../models/Quote');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
exports.getQuotesByCategory = catchAsync(async (req, res) => {
  const { category, page = 1, limit = 1 } = req.query;

  if (!category) {
    throw new AppError('Category is required', 400);
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const quotes = await Quote.find({
    category,
    isActive: true,
  })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .sort({ createdAt: -1 });


  if (quotes.length === 0) {
    return res.status(200).json({
      success: true,
      page: pageNum,
      quotes: [],
      message: 'No quotes found for this category',
    });
  }

  res.status(200).json({
    success: true,
    page: pageNum,
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
