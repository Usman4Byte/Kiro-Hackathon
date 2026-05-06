const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash -refreshToken');
    
    if (!req.user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }
    
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token failed');
  }
});

module.exports = { verifyToken };
