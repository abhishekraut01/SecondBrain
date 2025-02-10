import asyncHandler from '../utils/asyncHandler';
import { Response, Request } from 'express';
import { createContentSchema } from '../validation/validationSchema';
import ApiError from '../utils/ApiError';
import Content from '../models/content.model';
import mongoose, { ObjectId } from 'mongoose';
import ApiResponse from '../utils/ApiResponse';

interface CustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  };
}

export const createContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const validationResult = createContentSchema.safeParse(req.body);

    if (!validationResult.success) {
      throw new ApiError(
        400,
        'user input is invalid',
        validationResult.error.errors
      );
    }

    const { link, title } = validationResult.data;

    const UserId: string | ObjectId | undefined = req.user?._id;

    if (!UserId) {
      throw new ApiError(400, 'user is not authenticated');
    }

    const content = await Content.create({
      link,
      title,
      tags: [],
      userId: UserId,
    });

    if (!content) {
      throw new ApiError(500, 'unable to create content');
    }

    return res
      .status(200)
      .json(new ApiResponse(201, 'new content created', content));
  }
);
