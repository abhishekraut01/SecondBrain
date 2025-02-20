import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import Link from '../models/link.model';
import crypto from 'crypto';
import Content from '../models/content.model';

interface CustomRequest extends Request {
  user?: { _id: string };
}

/**
 * Save or delete a public link based on the `share` status.
 * If `share: true`, generates a unique hash link.
 * If `share: false`, deletes the public link.
 */
export const saveLink = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const share = req.body?.share;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    if (!share) {
      const existingLink = await Link.deleteMany({ userId });

      if (!existingLink) {
        throw new ApiError(404, 'No public link found');
      }

      return res
        .status(200)
        .json(new ApiResponse(200, 'Updated share status to private'));
    }

    const hashvalue = crypto.randomBytes(32).toString('hex');
    const newLink = await Link.create({ userId, hash: hashvalue });

    return res
      .status(201)
      .json(new ApiResponse(201, 'Updated share status to public', newLink));
  }
);

/**
 * Get all links of the authenticated user.
 */
export const getAllLinks = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    const links = await Link.find({ userId }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, 'Links fetched successfully', links));
  }
);

/**
 * Fetches content from a public link.
 */
export const getPublicBrain = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, 'Link ID is required');
    }

    const link = await Link.findOne({
      hash:id
    });

    if (!link) {
      throw new ApiError(404, 'Link not found');
    }

    // Fetch all content of the user who owns this public link
    const usersBrainContent = await Content.find({ userId: link.userId });

    if (!usersBrainContent || usersBrainContent.length === 0) {
      throw new ApiError(404, 'Content not found');
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Content fetched successfully', usersBrainContent)
      );
  }
);
