import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import imageParser from '../middlewares/image-parser';
import { updateUserValidator } from '../validators/auth-validators';
import {
  getAllUsers,
  getLoggedInUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfilePic,
  getProductReviews
} from '../controllers/user-controllers';

const router = Router();

router.route('/').get(isAuth, isAdmin, getAllUsers);
router.route('/active').get(isAuth, getLoggedInUser);
router
  .route('/update-profile')
  .patch(isAuth, imageParser.single('profilePic'), updateProfilePic);
router
  .route('/:userId')
  .get(isAuth, getSingleUser)
  .put(isAuth, updateUserValidator, updateUser)
  .delete(isAuth, deleteUser);
router.route('/product-reviews').get(isAuth, getProductReviews);

export default router;
