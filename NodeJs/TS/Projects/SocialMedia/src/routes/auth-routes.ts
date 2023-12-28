import { Router } from 'express';
import { signupUserRules } from '../utils/validators';
import { signupUser } from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupUserRules, signupUser);

export default router;
