import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  signupRules,
  signinRules,
  emailValidation,
  passwordValidation
} from '../validators/auth-validators';
import {
  signupUser,
  signinUser,
  getUserProfile,
  handleForgetPassword,
  resetPassword
} from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupRules, signupUser);
router.route('/signin').post(signinRules, signinUser);
router.route('/user').get(isAuth, getUserProfile);
router.route('/forgot-password').post(emailValidation, handleForgetPassword);
router.route('/reset-password').post(passwordValidation, resetPassword);

export default router;
