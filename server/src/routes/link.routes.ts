import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router()


// POST	/api/v1/link/	Save a new link
router.route('/').post(authMiddleware)

// GET	/api/links	Get all saved links
// GET	/api/links/:id	Get a single link by ID
// DELETE	/api/links/:id	Delete a link by ID


export default router