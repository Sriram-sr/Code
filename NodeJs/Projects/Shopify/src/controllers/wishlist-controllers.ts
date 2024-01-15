import { RequestHandler } from 'express';
import { customRequest } from '../types/custom-types';
import {
  validateObjectId,
  errorHandler,
  HTTP_STATUS
} from '../utils/error-handler';
import Product from '../models/Product';
import User from '../models/User';

// @route   GET /api/v1/wishlist/
// @desc    Gets wishlist products of the user
// @access  Private
export const getWishlist: RequestHandler = (req: customRequest, res, next) => {
  const currentPage = (req.query as { page: string }).page || 1;
  const perPage = 2;

  User.findById(req.userId)
    .populate('wishlist')
    .then(user => {
      let wishlist;
      if (user && user?.wishlist.length > perPage) {
        wishlist = user.wishlist
          .slice((+currentPage - 1) * perPage)
          .slice(0, perPage);
      } else {
        wishlist = user?.wishlist;
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched wishlist',
        wishlist
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get wishlist currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/wishlist/:productId
// @desc    Adds product to wishlist
// @access  Private
export const addToWishlist: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  const serverErrorStr =
    'Something went wrong, could not add to wishlist currently';
  const productId = (req.params as { productId: string }).productId;
  validateObjectId(productId);

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      User.findById(req.userId)
        .then(user => {
          const existingProductInList = user?.wishlist.find(
            id => id.toString() === productId
          );
          if (existingProductInList) {
            return errorHandler(
              'Product already exists in wishlist',
              HTTP_STATUS.CONFLICT,
              next
            );
          }
          user?.wishlist.unshift(product._id);
          user
            ?.save()
            .then(modifiedUser => {
              res.status(HTTP_STATUS.OK).json({
                message: 'Successfully added product to wishlist',
                modifiedUser
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

// @route   DELETE /api/v1/wishlist/:productId
// @desc    Removes product from wishlist
// @access  Private
export const removeFromWishlist: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  const serverErrorStr =
    'Something went wrong, could not remove product from wishlist currently';
  const productId = (req.params as { productId: string }).productId;
  validateObjectId(productId);

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      User.findById(req.userId)
        .then(user => {
          const existingProductIdx = user?.wishlist.findIndex(
            product => product._id.toString() === productId
          )!;
          if (existingProductIdx >= 0) {
            user?.wishlist.splice(existingProductIdx, 1);
            user
              ?.save()
              .then(modifiedUser => {
                res.status(HTTP_STATUS.OK).json({
                  message: 'Successfully removed product from wishlist',
                  modifiedUser
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
          } else {
            return errorHandler(
              'Product does not exist in the wishlist for removal',
              HTTP_STATUS.CONFLICT,
              next
            );
          }
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

// @route   PATCH /api/v1/wishlist/clear
// @desc    Removes all products from wishlist
// @access  Private
export const clearWishlist: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  User.findById(req.userId)
    .then(user => {
      if (user) {
        user.wishlist = [];
      }
      return user?.save();
    })
    .then(modifiedUser => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully cleared the wishlist',
        modifiedUser
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not clear the wishlist currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
