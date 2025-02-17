import { Router } from "express";
import { deleteUserProfile, getUserProfile, updateUserProfile } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router()

// ✅ Get user profile by ID
router.route('/').get(authMiddleware,getUserProfile)

// ✅ Update user profile
router.route('/').patch(authMiddleware,updateUserProfile)

// ✅ Delete user account
router.route('/').delete(authMiddleware,deleteUserProfile)

export default router


