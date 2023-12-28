import { Router } from 'express';
import { signupRules } from '../validators/auth-validators';
import { signupUser } from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupRules, signupUser);
router.route('/signin');

export default router;