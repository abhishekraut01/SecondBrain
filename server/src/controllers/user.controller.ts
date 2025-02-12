import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { ObjectId } from 'mongoose';
import ApiError from '../utils/ApiError';
import User from '../models/user.model';
import ApiResponse from '../utils/ApiResponse';
import { updateUserProfileSchema } from '../validation/validationSchema';
import Content from '../models/content.model';
import Link from '../models/link.model';

interface customRequest extends Request {
  user?: {
    _id: string | ObjectId;
  };
}

export const getUserProfile = asyncHandler(
  async (req: customRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated. Please log in.');
    }

    const user = await User.findById(userId)
      .select(
        '-password -resetPasswordToken -resetPasswordExpires -refreshToken'
      )
      .lean();

    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'User profile fetched successfully.', user));
  }
);

export const updateUserProfile = asyncHandler(
  async (req: customRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated. Please log in.');
    }

    // Validate user input
    const validationResult = updateUserProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Invalid User Input Schema',
        validationResult.error.errors
      );
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: validationResult.data },
      { new: true, runValidators: true }
    )
      .select(
        '-password -resetPasswordToken -resetPasswordExpires -refreshToken'
      )
      .lean();

    if (!updatedUser) {
      throw new ApiError(404, 'User not found. Unable to update profile.');
    }

    // Send response
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'User profile updated successfully.', updatedUser)
      );
  }
);

export const deleteUserProfile = asyncHandler(
  async (req: customRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, "User is not authenticated. Please log in.");
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    
    await Promise.all([
      User.findByIdAndDelete(userId), 
      Content.deleteMany({ userId }), 
      Link.deleteMany({ userId }), 
    ]);

    return res.status(200).json(
      new ApiResponse(200, "User profile deleted successfully.")
    );
  }
);
