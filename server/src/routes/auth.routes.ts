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

const router = express.Router();

//possword reset route
router.route('/request-password-reset').post(requestPasswordReset);
router.route('/reset-password/:token').post(resetPassword);

//user auth routes
router.route('/signup').post(upload.single('avatar'), userSignUp);
router.route('/login').post(upload.single('avatar'), userLogin);
router.route('/logout').post(upload.single('avatar'), userLogout);
router.route('/me').post(upload.single('avatar'), getUserDetails);

export default router;