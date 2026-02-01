const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const upload = require('../config/multer');
const {
  getProfile,
  updateProfile,
} = require('../controllers/user.controller');


router.get('/me', auth, getProfile);

router.put(
  '/me',
  auth,
  upload.single('photo'),
  updateProfile
);

module.exports = router;
