const { createTokens } = require('../helpers/jwt_tokens');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user.comparePassword(password)) {
      return res.status(401).json({ msg: 'The password is incorrect' });
    }

    const { accessToken, refreshToken } = await createTokens(user._id);

    return res.json({
      msg: 'user logged in',
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    res.json({
      msg: 'user created, verify your account',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { login, register };
