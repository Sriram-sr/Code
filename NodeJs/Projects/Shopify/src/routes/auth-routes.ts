import { Router } from 'express';
import {
  signinReqValidator,
  signupReqValidator,
  emailValidator,
  resetPasswordReqValidator
} from '../validators/auth-validators';
import {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword
} from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupReqValidator, signupUser);
router.route('/signin').post(signinReqValidator, signinUser);
router.route('/forgot-password').post(emailValidator, handleForgetPassword);
router.route('/reset-password').post(resetPasswordReqValidator, resetPassword);

export default router;
