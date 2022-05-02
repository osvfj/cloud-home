const router = require('express').Router();
const {
  login,
  refreshTokens /* register */,
} = require('../controllers/auth.controller');
const authorization = require('../middlewares/authorization');

router.post('/login', login);
router.get('/refresh', [authorization], refreshTokens);
// router.post('/register', register);

module.exports = router;
