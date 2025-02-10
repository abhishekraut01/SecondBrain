import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createContent, getContent, getSingleContent } from "../controllers/content.controller";
const router = Router()


// POST	/api/content	Create a new content entry
router.route('/content').post( authMiddleware,createContent);

// GET	/api/content	Get all content for a user
router.route('/content').get(authMiddleware , getContent)

// GET	/api/content/:id	Get a single content by ID
router.route('/content/:id').get(authMiddleware , getSingleContent)

// PUT	/api/content/:id	Update content by ID
// DELETE	/api/content/:id	Delete content by ID