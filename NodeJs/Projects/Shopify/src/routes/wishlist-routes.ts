import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} from '../controllers/wishlist-controllers';

const router = Router();

router.route('/').get(isAuth, getWishlist);
router
  .route('/:productId')
  .post(isAuth, addToWishlist)
  .delete(isAuth, removeFromWishlist);
router.route('/clear').patch(isAuth, clearWishlist);

export default router;
