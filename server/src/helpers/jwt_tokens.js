const jwt = require('jsonwebtoken');
const {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} = require('../config')

const createTokens = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = jwt.sign({ id }, JWT_ACCESS_TOKEN, {
        expiresIn: '10m',
      });
      const refreshToken = jwt.sign({ id }, JWT_REFRESH_TOKEN, {
        expiresIn: '24h',
      });

      resolve({ accessToken, refreshToken });
    } catch (error) {
      reject({
        status: 500,
        message: 'Error while generating access token',
      });
    }
  });
};

const verifyToken = (token, secret) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (secret === JWT_REFRESH_TOKEN) {
        const decoded = jwt.verify(token, secret);
        return resolve(decoded);
      }

      const decoded = jwt.verify(token, secret);
      return resolve(decoded);
    } catch (error) {
      error.message === 'jwt expired'
        ? reject({
            status: 401,
            message: 'Token expired',
          })
        : reject({
            status: 500,
            message: 'Token is invalid',
          });
    }
  });
};

module.exports = {
  createTokens,
  verifyToken,
};
