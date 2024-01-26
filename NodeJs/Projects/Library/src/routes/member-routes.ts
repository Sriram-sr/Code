import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import { createMember } from '../controllers/member-controllers';
import { createMemberValidator } from '../validators/post-req-validators';

const router = Router();

router.route('/').post(isAuth, createMemberValidator, createMember);

export default router;
