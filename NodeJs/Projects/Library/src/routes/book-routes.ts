import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  createBookValidator,
  borrowReturnValidator
} from '../validators/post-req-validators';
import {
  createBook,
  borrowBook,
  returnBook
} from '../controllers/book-controllers';

const router = Router();

router.route('/').post(isAuth, createBookValidator, createBook);
router.route('/borrow/:bookId').post(isAuth, borrowReturnValidator, borrowBook);
router.route('/return/:bookId').post(isAuth, borrowReturnValidator, returnBook);

export default router;
