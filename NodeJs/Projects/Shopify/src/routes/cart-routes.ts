import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  getCart,
  addToCart,
  deleteProductFromCart,
  clearCart
} from '../controllers/cart-controllers';

const router = Router();

router.route('/').get(isAuth, getCart);
router.route('/clear').delete(isAuth, clearCart)
router
  .route('/:productId')
  .post(isAuth, addToCart)
  .delete(isAuth, deleteProductFromCart);

export default router;
