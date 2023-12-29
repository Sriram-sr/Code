import { Router } from 'express';
import { signupRules, signinRules } from '../validators/auth-validators';
import {
  signupUser,
  signinUser
} from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupRules, signupUser);
router.route('/signin').post(signinRules, signinUser);

export default router;
