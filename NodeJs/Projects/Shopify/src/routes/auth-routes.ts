import { Router } from 'express';
import { signupRules } from '../validation/auth-validators';
import { signupUser } from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupRules, signupUser);
// Signin route to build

export default router;
