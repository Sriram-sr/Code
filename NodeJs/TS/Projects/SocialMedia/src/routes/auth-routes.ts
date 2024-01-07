import { Router } from 'express';
import { signupUserRules, signinUserRules } from '../utils/validators';
import { signupUser, signinUser } from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupUserRules, signupUser);
router.route('/signin').post(signinUserRules, signinUser);

export default router;
