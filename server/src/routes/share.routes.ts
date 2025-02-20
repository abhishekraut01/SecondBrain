import express from 'express';
import {  getPublicBrain, saveLink,  } from '../controllers/share.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// enable of disable the share link
router.route('/').post(authMiddleware, saveLink);

// Get the brain with id
router.route('/:id').get(authMiddleware, getPublicBrain);


export default router;
