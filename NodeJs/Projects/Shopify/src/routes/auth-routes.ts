import { Router } from 'express';
import {
  signupReqValidator,
  signinReqValidator,
  emailValidator,
  resetPasswordReqValidator
} from '../validators/auth-validators';
import {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword
} from '../controllers/auth-controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints related to Authentication
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
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully"
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router.route('/signup').post(signupReqValidator, signupUser);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User signin
 *     description: Authenticate and sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsIn..."
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router.route('/signin').post(signinReqValidator, signinUser);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a password reset email to the user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Password reset email sent successfully"
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router.route('/forgot-password').post(emailValidator, handleForgetPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset the user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Password reset successfully"
 *       401:
 *         description: Unauthorized - Invalid or expired reset token
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router.route('/reset-password').post(resetPasswordReqValidator, resetPassword);

export default router;
