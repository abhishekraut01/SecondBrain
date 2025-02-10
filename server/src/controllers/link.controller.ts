import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import Link from '../models/link.model';

interface CustomRequest extends Request {
  user?: { _id: string };
}

export const saveLink = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { link, hash } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'User is not authenticated');
  }

  if (!link || !hash) {
    throw new ApiError(400, 'Link and hash are required');
  }

  // Check if the link already exists for the user
  const existingLink = await Link.findOne({ link, userId });
  if (existingLink) {
    throw new ApiError(400, 'This link is already saved');
  }

  const newLink = await Link.create({ link, hash, userId });

  return res.status(201).json(new ApiResponse(201, 'Link saved successfully', newLink));
});


export const getAllLinks = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id;
  
    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }
  
    const links = await Link.find({ userId }).sort({ createdAt: -1 });
  
    return res.status(200).json(new ApiResponse(200, 'Links fetched successfully', links));
  });