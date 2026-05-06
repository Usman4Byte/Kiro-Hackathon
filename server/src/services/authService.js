const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

class AuthService {
  generateTokens(userId) {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
    });

    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    });

    return { accessToken, refreshToken };
  }

  async register(name, email, password) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, 'User already exists');
    }

    // Create user object but don't save yet
    const user = new User({ name, email, passwordHash: password });
    
    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user._id);
    user.refreshToken = refreshToken;
    
    // Save once (this will trigger the password hashing pre-save hook)
    await user.save();

    return { user, accessToken, refreshToken };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const { accessToken, refreshToken } = this.generateTokens(user._id);
    user.refreshToken = refreshToken;
    
    // Save only the refresh token update (passwordHash won't be re-hashed because it's not modified)
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
  }
}

module.exports = new AuthService();
