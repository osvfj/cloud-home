const { JWT_ACCESS_TOKEN } = require('../config');
const { verifyToken } = require('../helpers/jwt_tokens');
const User = require('../models/User');

const authorization = async (req, res, next) => {
  const token = req.headers['authorization'] || req.query.token;

  if (!token) {
    return res.status(403).json({
      msg: 'No token provided.',
    });
  }

  try {
    const { id } = await verifyToken(token, JWT_ACCESS_TOKEN);
    req.user = await User.findById(id);

    return next();
  } catch (error) {
    return res.status(error.status).json({
      msg: error.message,
    });
  }
};

module.exports = authorization;
