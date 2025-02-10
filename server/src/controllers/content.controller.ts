import asyncHandler from '../utils/asyncHandler';
import { Request , Response } from 'express';
import { createContentSchema } from '../validation/validationSchema';
import ApiError from '../utils/ApiError';
import Content from '../models/content.model';
import { Types } from 'mongoose';
import ApiResponse from '../utils/ApiResponse';

interface CustomRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

export const createContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    // ✅ Validate request body using Zod schema
    const validationResult = createContentSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(
        new ApiError(
          400,
          'Invalid user input',
          validationResult.error.errors // More structured error messages
        )
      );
    }

    const { link, title, type, description, tags } = validationResult.data;
    const userId = req.user?._id;

    // ✅ Check if user is authenticated
    if (!userId) {
      return res.status(401).json(new ApiError(401, 'User is not authenticated'));
    }

    // ✅ Ensure the link is unique for the user (Optional but useful)
    const existingContent = await Content.findOne({ link, userId });
    if (existingContent) {
      return res.status(400).json(new ApiError(400, 'Content with this link already exists.'));
    }

    // ✅ Create new content
    const content = await Content.create({
      link,
      title,
      type,
      description,
      tags: tags || [],
      userId,
    });

    if (!content) {
      throw new ApiError(500, 'Unable to create content');
    }

    // ✅ Return success response
    return res
      .status(201)
      .json(new ApiResponse(201, 'New content created successfully', content));
  }
);
