import { Router } from 'express';
import { isAuthenticated } from '../middlewares/is-authenticated';
import { isAdmin } from '../middlewares/is-admin';
import {
  signupReqValidator,
  signinValidator,
  updateUserValidator
} from '../validators/auth-validators';
import {
  signupUser,
  signinUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
} from '../controllers/auth-controllers';

const router = Router();

router.route('/signup').post(signupReqValidator, signupUser);
router.route('/signin').post(signinValidator, signinUser);
router.route('/users').get(isAuthenticated, isAdmin, getAllUsers);
router
  .route('/users/:userId')
  .get(isAuthenticated, isAdmin, getSingleUser)
  .patch(isAuthenticated, isAdmin, updateUserValidator, updateUser)
  .delete(isAuthenticated, isAdmin, deleteUser);

export default router;
