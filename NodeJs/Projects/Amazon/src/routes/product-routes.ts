import { Router } from 'express';
import { isAuthenticated } from '../middlewares/is-authenticated';
import { isAdmin } from '../middlewares/is-admin';
import { createProduct } from '../controllers/product-controllers';

const router = Router();

router.route('/').post(isAuthenticated, isAdmin, createProduct);

export default router;
