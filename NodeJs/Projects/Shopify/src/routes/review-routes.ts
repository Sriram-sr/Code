import { Router } from 'express';
import { body } from 'express-validator';
import isAuth from '../middlewares/is-auth';
import {
  getReviews,
  postReview,
  getSingleReview,
  updateReview,
  deleteReview,
  likeReview,
  unlikeReview
} from '../controllers/review-controllers';

const router = Router();

const postReviewValidator = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 500 })
    .withMessage('Comment must not exceed 500 characters')
];

const updateReviewValidator = [
  body('rating')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Comment must not exceed 500 characters')
];

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Operations related to reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         product:
 *           type: string
 *           description: ID of the product associated with the review
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *             description: ID of a user who liked the review
 *         user:
 *           type: string
 *           description: ID of the user who posted the review
 */

/**
 * @swagger
 * /reviews/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     description: Retrieve reviews for a specific product by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product for which reviews are retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               reviews: [{ id: '123', text: 'Great product!' }]
 *       401:
 *         description: Unauthorized - User is not authenticated
 *   post:
 *     summary: Post a review for a product
 *     description: Post a new review for a specific product by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product for which the review is posted
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: review
 *         description: The review to post
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Review posted successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       422:
 *         description: Unprocessable Entity - Validation error
 */
router
  .route('/:productId')
  .get(isAuth, getReviews)
  .post(isAuth, postReviewValidator, postReview);

/**
 * @swagger
 * /reviews/product/{reviewId}:
 *   get:
 *     summary: Get a single review by ID
 *     description: Retrieve a single review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID of the review to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               review: { id: '123', text: 'Great product!' }
 *       401:
 *         description: Unauthorized - User is not authenticated
 *   put:
 *     summary: Update a review by ID
 *     description: Update a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID of the review to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: review
 *         description: The updated review data
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Review updated successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       422:
 *         description: Unprocessable Entity - Validation error
 *   delete:
 *     summary: Delete a review by ID
 *     description: Delete a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID of the review to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Review deleted successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router
  .route('/product/:reviewId')
  .get(isAuth, getSingleReview)
  .put(isAuth, updateReviewValidator, updateReview)
  .delete(isAuth, deleteReview);

/**
 * @swagger
 * /reviews/like/{reviewId}:
 *   post:
 *     summary: Like a review by ID
 *     description: Like a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID of the review to like
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Review liked successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.route('/like/:reviewId').post(isAuth, likeReview);

/**
 * @swagger
 * /reviews/unlike/{reviewId}:
 *   delete:
 *     summary: Unlike a review by ID
 *     description: Unlike a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID of the review to unlike
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Review unliked successfully"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *
 */
router.route('/unlike/:reviewId').post(isAuth, unlikeReview);

export default router;
