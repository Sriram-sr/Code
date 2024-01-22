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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user actions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         profilePicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         personalDetails:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's additional email address
 *             mobile:
 *               type: string
 *               description: User's mobile number
 *             gender:
 *               type: string
 *               enum: ['male', 'female', 'others']
 *               description: User's gender
 *         role:
 *           type: string
 *           enum: ['admin', 'customer']
 *           description: User's role (admin or customer)
 *         cart:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the product in the user's cart
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product in the user's cart
 *               price:
 *                 type: number
 *                 description: Price of the product in the user's cart
 *           description: User's shopping cart
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of the user's order
 *           description: IDs of the user's orders
 *         wishlist:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of the product in the user's wishlist
 *           description: IDs of the products in the user's wishlist
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of the user's review
 *           description: IDs of the user's reviews
 *         resetToken:
 *           type: string
 *           description: Token for password reset
 *         resetTokenExpiry:
 *           type: string
 *           format: date-time
 *           description: Expiry date of the password reset token
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               users: [...]
 *       401:
 *         description: Unauthorized - User is not authenticated or not an admin
 */
router.route('/').get(isAuth, isAdmin, getAllUsers);

/**
 * @swagger
 * /users/active:
 *   get:
 *     summary: Get logged-in user
 *     description: Retrieve details of the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the logged-in user
 *         content:
 *           application/json:
 *             example:
 *               user: {...}
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/active').get(isAuth, getLoggedInUser);

/**
 * @swagger
 * /users/product-reviews:
 *   get:
 *     summary: Get product reviews for the logged-in user
 *     description: Retrieve product reviews submitted by the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of product reviews
 *         content:
 *           application/json:
 *             example:
 *               reviews: [...]
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/product-reviews').get(isAuth, getProductReviews);

/**
 * @swagger
 * /users/update-profile:
 *   patch:
 *     summary: Update user profile picture
 *     description: Update the profile picture of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile picture updated successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router
  .route('/update-profile')
  .patch(isAuth, imageParser.single('profilePic'), updateProfilePic);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a user by their ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the user
 *         content:
 *           application/json:
 *             example:
 *               user: {...}
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       404:
 *         description: Not Found - User with the specified ID not found
 *   put:
 *     summary: Update user by ID
 *     description: Update details of a user by their ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       404:
 *         description: Not Found - User with the specified ID not found
 *       422:
 *         description: Unprocessable Entity - Validation error
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       404:
 *         description: Not Found - User with the specified ID not found
 */
router
  .route('/:userId')
  .get(isAuth, getSingleUser)
  .put(isAuth, updateUserValidator, updateUser)
  .delete(isAuth, deleteUser);

export default router;
