import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const deleteUserProfile = asyncHandler(
  async (req: Request, res: Response) => {}
);
