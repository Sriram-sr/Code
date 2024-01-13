import { Router } from 'express';
import { isAuthenticated } from '../middlewares/is-authenticated';
import { isAdmin } from '../middlewares/is-admin';
import { createProductValidator } from '../validators/product-validators';
import { getProducts, createProduct } from '../controllers/product-controllers';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(isAuthenticated, isAdmin, createProductValidator, createProduct);

export default router;
