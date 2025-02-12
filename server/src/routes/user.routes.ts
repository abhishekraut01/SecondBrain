import { Router } from "express";
import { deleteUserProfile, getUserProfile, updateUserProfile } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router()

// ✅ Get user profile by ID
router.route('/:id').get(authMiddleware,getUserProfile)

// ✅ Update user profile
router.route('/:id').patch(authMiddleware,updateUserProfile)

// ✅ Delete user account
router.route('/:id').delete(authMiddleware,deleteUserProfile)

export default router


