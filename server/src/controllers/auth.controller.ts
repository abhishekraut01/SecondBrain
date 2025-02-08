import { Request, Response ,CookieOptions } from 'express';
import User from '../models/user.model';
import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler';
export interface CustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  };
}
import {
  loginValidationSchema,
  requestResetPasswordSchema,
  ResetPasswordSchema,
  signUpvalidationSchema,
} from '../validation/validationSchema';
import ApiError from '../utils/ApiError';
import sendEmail from '../utils/sendEmail';
import ApiResponse from '../utils/ApiResponse';
import uploadOnCloudinary from '../utils/Cloudinary';
import { ObjectId } from 'mongoose';

const generateAccessAndRefreshToken = async (
  _id: ObjectId
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Error while generating access and refresh token');
  }
};

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
  const validationResult = signUpvalidationSchema.safeParse(req.body);

  //step -1 check for user input validation
  if (!validationResult.success) {
    throw new ApiError(
      400,
      'Invalid User Input Schema',
      validationResult.error.errors
    );
  }

  const { username, email, password } = validationResult.data;

  //step 2 - check that if user already exist or not

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(409, 'User already exist');
  }

  // Step 3: Handle avatar and cover image file uploads

  const localAvatarPath = req.file?.path;

  if (!localAvatarPath) {
    throw new ApiError(400, 'Avatar file is required');
  }

  //upload image to cloudinary
  const avatar = await uploadOnCloudinary(localAvatarPath);

  if (!avatar) {
    throw new ApiError(500, 'Error uploading avatar file');
  }

  // Step 5: Create and save the user
  const newUser = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    avatar: avatar.url,
  });

  // Step 6: Remove sensitive fields for the response
  const createdUser = await User.findById(newUser._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Error while creating user');
  }

  // Step 7: Return response
  res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', createdUser));
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = loginValidationSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw new ApiError(
      400,
      'Invalid User Input Schema',
      validationResult.error.errors
    );
  }

  const { email, password } = validationResult.data;

  if (!email) {
    throw new ApiError(409, 'email is required');
  }

  if (!password) {
    throw new ApiError(409, 'Password is required');
  }

  // Step 2: Check if user exists in the database
  const userExist = await User.findOne({
    email,
  });

  if (!userExist) {
    throw new ApiError(409, 'User does not exist. Please signup first');
  }

  // Step 3: Check if the password is correct
  const isPasswordCorrect: boolean = await userExist.isPasswordValid(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Password is incorrect');
  }

  // Step 4 : generate access and refresh tokens

  const tokenResult = await generateAccessAndRefreshToken(
    userExist._id as ObjectId
  );

  const { accessToken, refreshToken } = tokenResult;

  const userResponse = await User.findById(userExist._id).select(
    '-password -refreshToken'
  );

  if (!userResponse) {
    throw new ApiError(500, 'Error while fetching user data');
  }

  interface Ioptions {
    secure: boolean;
    httpOnly: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

  const options:Ioptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  };

  // Step 6: Return response
  res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, 'Login successful', {
        accessToken,
        refreshToken,
        user: userResponse.toObject({
          getters: true,
          virtuals: false,
          versionKey: false,
        }),
      })
    );
});

export const userLogout = asyncHandler(async (req: CustomRequest, res: Response) => {
  const UserId: string | ObjectId | undefined = req.user?._id;

  if (!UserId) {
    return res.status(400).json(new ApiResponse(400, "User ID not found", {}));
  }

  await User.findByIdAndUpdate(
    UserId,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );

  const options: CookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out", {}));
});
