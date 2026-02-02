const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const Download = require('../models/Download');
router.post('/', auth, async (req, res) => {
  const { imageUrl, isBranded } = req.body;

  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: userId missing from token',
    });
  }

  await Download.create({
    userId,
    imageUrl,
    isBranded,
  });

  res.status(201).json({ success: true });
});

router.get('/', auth, async (req, res) => {
  const userId = req.user.userId;

  const downloads = await Download.find({ userId })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    downloads,
  });
});


module.exports = router;
