import { Request, Response } from 'express';
import User from '../models/user.model';
import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler';
import bcrypt from 'bcryptjs';
import {
  requestResetPasswordSchema,
  ResetPasswordSchema,
  signUpvalidationSchema,
} from '../validation/validationSchema';
import ApiError from '../utils/ApiError';
import sendEmail from '../utils/sendEmail';
import ApiResponse from '../utils/ApiResponse';

export const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response) => {
    const validationResult = requestResetPasswordSchema.safeParse(req.body);

    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Validation failed',
        validationResult.error.errors
      );
    }

    const { username, email } = validationResult.data;

    //check for the user in the database
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!existingUser) {
      throw new ApiError(404, 'User not found');
    }

    const resetToken = await existingUser.generatePasswordResetToken();
    await existingUser.save({ validateBeforeSave: false });

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes.`;

    try {
      await sendEmail({
        to: existingUser.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json(new ApiResponse(200, 'Password reset email sent'));
    } catch (err) {
      existingUser.resetPasswordToken = null;
      existingUser.resetPasswordExpires = null;
      await existingUser.save({ validateBeforeSave: false });
      throw new ApiError(500, 'Email could not be sent');
    }
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const validationResult = ResetPasswordSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Validation failed',
        validationResult.error.errors
      );
    }

    const { token } = req.params;
    const { password } = validationResult.data;

    if (!token || typeof token !== 'string') {
      throw new ApiError(400, 'Invalid token');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new ApiError(400, 'Invalid or expired token');
    }

    user.password = password; // Will be hashed by pre-save middleware
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json(
      new ApiResponse(200, 'Password reset successfully', {
        user: user.username,
      })
    );
  }
);

export const userSignUp = asyncHandler(async (req: Request, res: Response) => {
  const validationResult =  signUpvalidationSchema.safeParse(req.body)

  //step -1 check for user input validation
  if(!validationResult.success){
    throw new ApiError(
      400,
      "Invalid User Input Schema",
      validationResult.error.errors
    )
  }

  const {username , email , password} = validationResult.data

  //step 2 - check that if user already exist or not

  const isUserExist = await User.findOne({
    $or:[{username},{email}]
  })

  if(isUserExist){
    throw new ApiError(409 , "User already exist")
  }

  // Step 3: Handle avatar and cover image file uploads

  

});
