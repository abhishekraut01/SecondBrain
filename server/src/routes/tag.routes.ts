import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createTag, deleteTag, getAllTags } from "../controllers/tag.controller";
const router = Router();


// ✅ Create a new tag
router.route('/').post(authMiddleware , createTag)

export default router

// ✅ Get all tags
router.route('/').get(authMiddleware, getAllTags);

// ✅ Delete a tag by ID
router.route('/:id').delete(authMiddleware, deleteTag);


