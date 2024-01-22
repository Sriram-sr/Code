import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} from '../controllers/wishlist-controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints related to user wishlist
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     description: Retrieve the products in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in the wishlist
 *         content:
 *           application/json:
 *             example:
 *               wishlist: [...]
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/').get(isAuth, getWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   post:
 *     summary: Add product to wishlist
 *     description: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to add to the wishlist
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToWishlist'
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product added to wishlist successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       422:
 *         description: Unprocessable Entity - Validation error
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to remove from the wishlist
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product removed from wishlist successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router
  .route('/:productId')
  .post(isAuth, addToWishlist)
  .delete(isAuth, removeFromWishlist);

/**
 * @swagger
 * /wishlist/clear:
 *   patch:
 *     summary: Clear wishlist
 *     description: Clear all products from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Wishlist cleared successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/clear').patch(isAuth, clearWishlist);

export default router;
