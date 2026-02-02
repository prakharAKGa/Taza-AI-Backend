const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  getPlans,
  activatePremium,
} = require('../controllers/subscription.controller');

router.get('/plans', getPlans);
router.post('/activate', auth, activatePremium);

module.exports = router;
