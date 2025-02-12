import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createTag } from "../controllers/tag.controller";
const router = Router();


// POST	/api/tags	Create a new tag
router.route('/').post(authMiddleware , createTag)

export default router



