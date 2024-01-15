import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import {
  createProductValidator,
  updateProductValidator
} from '../validators/product-validators';
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product-controllers';

const router = Router();

router
  .route('/')
  .get(getAllProducts)
  .post(isAuth, isAdmin, createProductValidator, createProduct);
router
  .route('/:productId')
  .get(getSingleProduct)
  .put(isAuth, isAdmin, updateProductValidator, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

export default router;
