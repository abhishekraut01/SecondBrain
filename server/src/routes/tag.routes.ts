import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createTag, getAllTags } from "../controllers/tag.controller";
const router = Router();


// POST	/api/tags	Create a new tag
router.route('/').post(authMiddleware , createTag)

export default router

// ✅ Get all tags
router.route('/').get(authMiddleware, getAllTags);



