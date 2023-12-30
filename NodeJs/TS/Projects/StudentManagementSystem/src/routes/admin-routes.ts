import { Router } from 'express';
import { getCourses } from '../controllers/admin-controllers';

const router = Router();

router.route('/course').get(getCourses);

export default router;
