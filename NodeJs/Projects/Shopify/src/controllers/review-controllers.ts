import { RequestHandler } from 'express';
import { Types, Document } from 'mongoose';
import {
  checkValidationFields,
  validateObjectId,
  errorHandler,
  HTTP_STATUS
} from '../utils/error-handler';
import { customRequest } from '../types/custom-types';
import Product from '../models/Product';
import Review from '../models/Review';
import User from '../models/User';

// @route  GET /api/v1/review/:productId
// @desc   Gets reviews for a product
// @access Private
export const getReviews: RequestHandler = (req, res, next) => {
  const productId = (req.params as { productId: string }).productId;
  validateObjectId(productId);
  const currentPage = (req.query as { page: string }).page || 1;
  const perPage = 2;

  Product.findById(productId)
    .populate({
      path: 'reviews',
      populate: [
        {
          path: 'user',
          model: 'User',
          select: 'email -_id'
        }
      ]
    })
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      let productReviews;
      if (product.reviews.length <= perPage) {
        productReviews = product.reviews;
      } else {
        productReviews = product.reviews
          .slice((+currentPage - 1) * perPage)
          .slice(0, perPage);
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched reviews for the product',
        productReviews
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get reviews currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route  POST /api/v1/review/:productId
// @desc   Adds review for a product
// @access Private
export const postReview: RequestHandler = (req: customRequest, res, next) => {
  checkValidationFields(req);
  const productId = (req.params as { productId: string }).productId;
  validateObjectId(productId);
  const { rating, comment } = req.body as { rating: number; comment: string };
  let createdReview: Document;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      Review.create({
        product: productId,
        rating,
        comment,
        likes: [],
        user: req.userId
      })
        .then(review => {
          createdReview = review;
          product.reviews.unshift(review._id);
          return product.save();
        })
        .then(() => {
          return User.findById(req.userId);
        })
        .then(user => {
          user?.reviews.unshift(createdReview._id);
          return user?.save();
        })
        .then(() => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully posted review for the product',
            createdReview
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not add review currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add review currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route  GET /api/v1/review/product/:reviewId
// @desc   Gets single review
// @access Private
export const getSingleReview: RequestHandler = (req, res, next) => {
  const reviewId = (req.params as { reviewId: string }).reviewId;
  validateObjectId(reviewId);

  Review.findById(reviewId)
    .populate({
      path: 'user',
      select: 'email -_id'
    })
    .then(review => {
      if (!review) {
        return errorHandler(
          'No review found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched review',
        review
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get review currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route  PUT /api/v1/review/product/:reviewId
// @desc   Updates review
// @access Private
export const updateReview: RequestHandler = (req: customRequest, res, next) => {
  const reviewId = (req.params as { reviewId: string }).reviewId;
  validateObjectId(reviewId);
  const { rating, comment } = req.body as { rating?: number; comment?: string };

  Review.findById(reviewId)
    .then(review => {
      if (!review) {
        return errorHandler(
          'No review found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (review.user._id.toString() !== req.userId) {
        return errorHandler(
          'Cannot update reviews posted by other users',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      if (rating) {
        review.rating = rating;
      }
      if (comment) {
        review.comment = comment;
      }
      review
        .save()
        .then(updatedReview => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully updated the review',
            updatedReview
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not update review currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update review currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route  DELETE /api/v1/review/product/:reviewId
// @desc   Deletes review
// @access Private
export const deleteReview: RequestHandler = (req: customRequest, res, next) => {
  const reviewId = (req.params as { reviewId: string }).reviewId;
  validateObjectId(reviewId);
  const serverErrorStr =
    'Something went wrong, could not delete review currently';

  Review.findById(reviewId)
    .then(review => {
      if (!review) {
        return errorHandler(
          'No review found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (review.user._id.toString() !== req.userId) {
        return errorHandler(
          'Cannot delete reviews posted by other users',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      Product.findById(review.product._id)
        .then(product => {
          const productReviews = product?.reviews;
          const reviewIdx = productReviews?.findIndex(
            singleReview =>
              singleReview._id.toString() === review._id.toString()
          );
          if (reviewIdx! >= 0) {
            productReviews?.splice(reviewIdx!, 1);
          }
          return product?.save();
        })
        .then(() => {
          return User.findById(req.userId);
        })
        .then(user => {
          const userReviews = user?.reviews;
          const reviewIdx = userReviews?.findIndex(
            singleReview =>
              singleReview._id.toString() === review._id.toString()
          );
          if (reviewIdx! >= 0) {
            userReviews?.splice(reviewIdx!, 1);
          }
          return user?.save();
        })
        .then(() => {
          return review.deleteOne();
        })
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted the review'
          });
        })
        .catch(err =>
          errorHandler(
            serverErrorStr,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route  POST /api/v1/review/like/:reviewId
// @desc   Likes a review
// @access Private
export const likeReview: RequestHandler = (req: customRequest, res, next) => {
  const reviewId = (req.params as { reviewId: string }).reviewId;
  validateObjectId(reviewId);

  Review.findById(reviewId)
    .then(review => {
      if (!review) {
        return errorHandler(
          'No review foudn with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      const existingLike = review.likes.find(
        like => like._id.toString() === req.userId
      );
      if (existingLike) {
        return errorHandler(
          'User liked this review already',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      review.likes.unshift(new Types.ObjectId(req.userId));
      review
        .save()
        .then(review => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully liked the review',
            review
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not like the review currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not like the review currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route  POST /api/v1/review/unlike/:reviewId
// @desc   Unlikes a review
// @access Private
export const unlikeReview: RequestHandler = (req: customRequest, res, next) => {
  const reviewId = (req.params as { reviewId: string }).reviewId;
  validateObjectId(reviewId);

  Review.findById(reviewId)
    .then(review => {
      if (!review) {
        return errorHandler(
          'No review foudn with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      const existingLikeIdx = review.likes.findIndex(
        like => like._id.toString() === req.userId
      );
      if (!(existingLikeIdx >= 0)) {
        return errorHandler(
          'User does not liked this review already to unlike',
          HTTP_STATUS.BAD_REQUEST,
          next
        );
      }
      review.likes.splice(existingLikeIdx, 1);
      review
        .save()
        .then(review => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully unliked the review',
            review
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not unlike the review currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not unlike the review currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
