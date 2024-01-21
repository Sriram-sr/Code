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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *           enum:
 *             - Mobiles
 *             - Mobile Accessories
 *             - Laptops
 *             - Desktop PCs
 *             - Computer Accessories
 *             - Computer Peripherals
 *         stockQuantity:
 *           type: number
 *         imageUrl:
 *           type: string
 *         likedUsers:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *         createdUser:
 *           type: string
 *           format: ObjectId
 *       required:
 *         - productName
 *         - description
 *         - price
 *         - category
 *         - stockQuantity
 *         - imageUrl
 *         - likedUsers
 *         - reviews
 *         - createdUser
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: A list of products.
 *   post:
 *     summary: Create a new product
 *     description: Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       '201':
 *         description: The created product.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

router
  .route('/')
  .get(getAllProducts)
  .post(isAuth, isAdmin, createProductValidator, createProduct);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Retrieve detailed information about a specific product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested product.
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *   put:
 *     summary: Update a product by ID
 *     description: Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       '200':
 *         description: The updated product.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *   delete:
 *     summary: Delete a product by ID
 *     description: Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

router
  .route('/:productId')
  .get(getSingleProduct)
  .put(isAuth, isAdmin, updateProductValidator, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

/**
 * @swagger
 * /product/likes/{productId}:
 *   get:
 *     summary: Get likes for a product
 *     description: Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of users who liked the product.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

router.get('/likes/:productId', isAuth, getProductLikes);

/**
 * @swagger
 * /product/like/{productId}:
 *   post:
 *     summary: Like a product
 *     description: Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Product liked successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

router.post('/like/:productId', isAuth, likeProduct);

/**
 * @swagger
 * /product/unlike/{productId}:
 *   delete:
 *     summary: Unlike a product
 *     description: Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product unliked successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

router.delete('/unlike/:productId', isAuth, unlikeProduct);

export default router;
