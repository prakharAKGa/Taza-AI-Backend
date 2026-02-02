router.post('/', auth, async (req, res) => {
  const { imageUrl, isBranded } = req.body;

  await Download.create({
    userId: req.user.userId,
    imageUrl,
    isBranded,
  });

  res.json({ success: true });
});
