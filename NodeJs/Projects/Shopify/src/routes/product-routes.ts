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
  deleteProduct,
  getProductLikes,
  likeProduct,
  unlikeProduct
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
router.route('/likes/:productId').get(isAuth, getProductLikes);
router.route('/like/:productId').post(isAuth, likeProduct);
router.route('/unlike/:productId').delete(isAuth, unlikeProduct);

export default router;
