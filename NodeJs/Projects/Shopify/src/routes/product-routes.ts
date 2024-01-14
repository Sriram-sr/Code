import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createProductValidator } from '../validators/product-validators';
import {
  getAllProducts,
  createProduct
} from '../controllers/product-controllers';

const router = Router();

router
  .route('/')
  .get(getAllProducts)
  .post(isAuth, isAdmin, createProductValidator, createProduct);

export default router;
