import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import { createBookValidator } from '../validators/post-req-validators';
import { createBook } from '../controllers/book-controllers';

const router = Router();

router.route('/').post(isAuth, createBookValidator, createBook);

export default router;