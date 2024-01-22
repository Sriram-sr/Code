import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import {
  getCart,
  addToCart,
  deleteProductFromCart,
  clearCart
} from '../controllers/cart-controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Endpoints for cart related actions
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     description: Retrieve the products in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in the cart
 *         content:
 *           application/json:
 *             example:
 *               cart: [...]
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/').get(isAuth, getCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear cart
 *     description: Clear all products from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Cart cleared successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/clear').delete(isAuth, clearCart);

/**
 * @swagger
 * /cart/{productId}:
 *   post:
 *     summary: Add product to cart
 *     description: Add a product to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to add to the cart
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCart'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product added to cart successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       422:
 *         description: Unprocessable Entity - Validation error
 *   delete:
 *     summary: Remove product from cart
 *     description: Remove a product from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to remove from the cart
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product removed from cart successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router
  .route('/:productId')
  .post(isAuth, addToCart)
  .delete(isAuth, deleteProductFromCart);

export default router;
