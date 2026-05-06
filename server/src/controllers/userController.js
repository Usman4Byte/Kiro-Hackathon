const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-passwordHash -refreshToken');
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  ).select('-passwordHash -refreshToken');

  if (!user) throw new ApiError(404, 'User not found');
  
  res.status(200).json(new ApiResponse(200, user, 'Profile updated successfully'));
});

module.exports = {
  getProfile,
  updateProfile,
};
