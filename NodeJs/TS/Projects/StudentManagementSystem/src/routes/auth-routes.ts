import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import imageParser from '../middlewares/image-parser';
import {
  signupRules,
  signinRules,
  emailRules,
  passwordRules
} from '../validators/auth-validators';
import {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword,
  getAllUsers,
  getUserProfile,
  updateProfile
} from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupRules, signupUser);
router.route('/signin').post(signinRules, signinUser);
router.route('/forgot-password').post(emailRules, handleForgetPassword);
router.route('/reset-password').post(passwordRules, resetPassword);
router.route('/all-users').get(isAuth, isAdmin, getAllUsers);
router.route('/user').get(isAuth, getUserProfile);
router
  .route('/update-profile')
  .patch(isAuth, imageParser.single('profilePicture'), updateProfile);

export default router;
