import express from 'express';
import {
  getUserDetails,
  requestPasswordReset,
  resetPassword,
  userLogin,
  userLogout,
  userSignUp,
} from '../controllers/auth.controller';
import upload from '../middlewares/multer.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// 🔒 Password reset routes (No auth required)
router.route('/request-password-reset').post(requestPasswordReset);
router.route('/reset-password/:token').post(resetPassword);

// 👤 User authentication routes
router.route('/signup').post(upload.single('avatar'), userSignUp);
router.route('/login').post(userLogin);
router.route('/logout').post(authMiddleware, userLogout);
router.route('/me').get(authMiddleware, getUserDetails);

export default router;
