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

router
  .route('/:productId')
  .get(isAuth, getReviews)
  .post(isAuth, postReviewValidator, postReview);
router
  .route('/product/:reviewId')
  .get(isAuth, getSingleReview)
  .put(isAuth, updateReviewValidator, updateReview)
  .delete(isAuth, deleteReview);
router.route('/like/:reviewId').post(isAuth, likeReview);
router.route('/unlike/:reviewId').post(isAuth, unlikeReview);

export default router;
