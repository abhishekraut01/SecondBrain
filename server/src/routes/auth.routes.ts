import express from 'express';
import {
  requestPasswordReset,
  resetPassword,
  userSignUp,
} from '../controllers/auth.controller';
import upload from '../middlewares/multer.middleware';

const router = express.Router();

//possword reset route
router.route('/request-password-reset').post(requestPasswordReset);
router.route('/reset-password/:token').post(resetPassword);

//user auth routes
router.route('/register').post(upload.single('avatar'), userSignUp);



export default router;

// POST	/api/auth/login	User login & get JWT token
// POST	/api/auth/logout	Logout user (invalidate token)
// GET	/api/auth/me	Get logged-in user details
// POST	/api/auth/forgot-password	Send password reset link
// POST	/api/auth/reset-password	Reset password
