import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
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
    const validationResult = createContentSchema.safeParse(req.body);
    if (!validationResult.success) {
      // Throwing the error allows the global error handler to catch and format it.
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
  
      // Find all content documents associated with the user
      const content = await Content.find({ userId }).populate([
        { path: 'userId' },
        { path: 'tags' }
      ]);
  
      // If no content is found, throw a 404 error
      if (!content || content.length === 0) {
        throw new ApiError(404, 'No content available');
      }
  
      return res.status(200).json(
        new ApiResponse(200, 'Content fetched successfully', content)
      );
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
  
      // ✅ Corrected `findById` usage
      const content = await Content.findById(contentId).populate([
        { path: 'userId' },
        { path: 'tags' }
      ]);
  
      if (!content) {
        throw new ApiError(404, 'Content not found');
      }
  
      return res.status(200).json(
        new ApiResponse(200, 'Content fetched successfully', content)
      );
    }
  );