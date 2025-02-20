import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import Link from '../models/link.model';
import crypto from 'crypto';

interface CustomRequest extends Request {
  user?: { _id: string };
}

export const saveLink = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { share } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    if (!share) {
      const existingLink = await Link.deleteMany({ userId });
      if (!existingLink) {
        throw new ApiError(404, 'brain was not public');
      }
      return res
        .status(200)
        .json(new ApiResponse(200, 'updated share status to private'));
    }

    const hashvalue = crypto.randomBytes(32).toString('hex');

    const newLink = await Link.create({ userId, hashvalue });

    return res
      .status(201)
      .json(new ApiResponse(201, 'updated share status to public', newLink));
  }
);

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

export const getPublicBrain = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }

    if (!id) {
      throw new ApiError(400, 'Link ID is required');
    }

    const link = await Link.findOne({ _id: id, userId });

    if (!link) {
      throw new ApiError(404, 'Link not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Link fetched successfully', link));
  }
);
