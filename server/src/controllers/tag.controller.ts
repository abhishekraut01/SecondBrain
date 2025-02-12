import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { ObjectId } from 'mongoose';
import { createTagSchema } from '../validation/validationSchema';
import ApiError from '../utils/ApiError';
import { Tag } from '../models/tag.model';
import ApiResponse from '../utils/ApiResponse';

interface CustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  };
}

export const createTag = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, 'Please login first');
    }

    const validationResult = createTagSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Validation failed',
        validationResult.error.errors
      );
    }

    const { title } = validationResult.data; // Fixed bug

    // Ensure uniqueness per user
    const existingTag = await Tag.findOne({ title, userId });
    if (existingTag) {
      throw new ApiError(400, 'Tag already exists');
    }

    const tag = await Tag.create({ title, userId }); // Fixed userId association
    if (!tag) {
      throw new ApiError(500, 'Unable to create tag');
    }

    res.status(201).json(new ApiResponse(201, 'New tag created', tag)); // Use 201 instead of 200
  }
);


export const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await Tag.find();

  if (!tags || tags.length === 0) {
    throw new ApiError(404, 'No tags found');
  }

  res.status(200).json(new ApiResponse(200, 'Tags fetched successfully', tags));
});


export const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    throw new ApiError(404, 'Tag not found');
  }

  res.status(200).json(new ApiResponse(200, 'Tag deleted successfully', tag));
});
