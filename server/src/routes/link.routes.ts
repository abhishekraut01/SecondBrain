import express from 'express';
import { getAllLinks, getSingleLink, saveLink,  } from '../controllers/link.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// Save a new link
router.route('/').post(authMiddleware, saveLink);

// Get all saved links
router.route('/').get(authMiddleware, getAllLinks);

// Get a single link by ID
router.route('/:id').get(authMiddleware, getSingleLink);

// Delete a link by ID
router.route('/:id').delete(authMiddleware, );

export default router;
