import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import {
  createContentSchema,
  updateContentSchema,
} from '../validation/validationSchema';
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
    const validationResult = createContentSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Invalid user input',
        validationResult.error.errors
      );
    }

    const { link, title, type, description, tags } = validationResult.data;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    const existingContent = await Content.findOne({ link, userId });
    if (existingContent) {
      throw new ApiError(400, 'Content with this link already exists.');
    }

    // Create new content
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

    return res
      .status(201)
      .json(new ApiResponse(201, 'New content created successfully', content));
  }
);

export const getContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    const content = await Content.find({ userId }).populate([
      { path: 'userId', select: 'username _id email' },
      { path: 'tags' },
    ]);

    // If no content is found, throw a 404 error
    if (!content || content.length === 0) {
      throw new ApiError(404, 'No content available');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Content fetched successfully', content));
  }
);

export const getSingleContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
    const contentId = req.params.id;

    if (!contentId) {
      throw new ApiError(400, 'Please provide content ID');
    }

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    const content = await Content.findById(contentId).populate([
      { path: 'userId', select: 'username _id email' },
      { path: 'tags' },
    ]);

    if (!content) {
      throw new ApiError(404, 'Content not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Content fetched successfully', content));
  }
);

export const updateContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
    const contentId = req.params.id;

    if (!contentId) {
      throw new ApiError(400, 'Please provide content ID');
    }

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    // Validate input using Zod
    const validationResult = updateContentSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new ApiError(
        400,
        'Invalid user input',
        validationResult.error.errors
      );
    }

    // Ensure the content exists and belongs to the user
    const content = await Content.findOneAndUpdate(
      { _id: contentId, userId }, // Only allow updates by the content owner
      { $set: validationResult.data },
      { new: true, runValidators: true } // Return updated doc & validate
    ).populate([
      { path: 'userId', select: 'username _id email' },
      { path: 'tags' },
    ]);

    if (!content) {
      throw new ApiError(404, 'Content not found or unauthorized');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Content updated successfully', content));
  }
);

export const deleteContent = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
    const contentId = req.params.id;

    if (!contentId) {
      throw new ApiError(400, 'Please provide content ID');
    }

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    // Find and delete the content only if it belongs to the user
    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
      throw new ApiError(404, 'Content not found or unauthorized');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Content deleted successfully', null));
  }
);
