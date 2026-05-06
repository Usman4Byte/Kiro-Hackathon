const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.register(name, email, password);

  // Set refresh token in httpOnly cookie
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.status(201).json(
    new ApiResponse(201, { user, accessToken, refreshToken }, 'User registered successfully')
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.status(200).json(
    new ApiResponse(200, { user, accessToken, refreshToken }, 'Login successful')
  );
});

module.exports = {
  register,
  login,
};
