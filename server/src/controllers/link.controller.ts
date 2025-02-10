import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import Link from '../models/link.model';
import crypto from 'crypto'

interface CustomRequest extends Request {
  user?: { _id: string };
}

export const saveLink = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { link } = req.body;
    const userId = req.user?._id;
  
    if (!userId) {
      throw new ApiError(401, 'User is not authenticated');
    }
  
    if (!link) {
      throw new ApiError(400, 'Link is required');
    }

    const hash = crypto.createHash('sha256').update(link).digest('hex');
  
    const existingLink = await Link.findOne({ hash, userId });
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

 
 export const getSingleLink = asyncHandler(async (req: CustomRequest, res: Response) => {
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
  
    return res.status(200).json(new ApiResponse(200, 'Link fetched successfully', link));
  });


 