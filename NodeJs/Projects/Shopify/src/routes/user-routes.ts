import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import {
  getAllUsers,
  getLoggedInUser,
  getSingleUser,
  updateUser,
  deleteUser
} from '../controllers/user-controllers';

const router = Router();

router.route('/').get(isAuth, isAdmin, getAllUsers);
router.route('/active').get(isAuth, getLoggedInUser);
router
  .route('/:userId')
  .get(isAuth, getSingleUser)
  .put(isAuth, updateUser)
  .delete(isAuth, deleteUser);

export default router;
