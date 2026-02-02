const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const Download = require('../models/Download');

router.post('/', auth, async (req, res) => {
  const { imageUrl, isBranded } = req.body;

  await Download.create({
    userId: req.user.id,
    imageUrl,
    isBranded,
  });

  res.json({ success: true });
});

router.get('/', auth, async (req, res) => {
  const downloads = await Download.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json({ success: true, downloads });
});

module.exports = router;
