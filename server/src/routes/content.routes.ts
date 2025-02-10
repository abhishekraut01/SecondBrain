import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createContent, deleteContent, getContent, getSingleContent, updateContent } from "../controllers/content.controller";
const router = Router()


// POST	/api/content	Create a new content entry
router.route('/').post( authMiddleware,createContent);

// GET	/api/content	Get all content for a user
router.route('/').get(authMiddleware , getContent)

// GET	/api/content/:id	Get a single content by ID
router.route('/:id').get(authMiddleware , getSingleContent)

// PUT	/api/content/:id	Update content by ID
router.route('/:id').patch(authMiddleware , updateContent)

// DELETE	/api/content/:id	Delete content by ID
router.route('/:id').delete(authMiddleware , deleteContent)


export default router