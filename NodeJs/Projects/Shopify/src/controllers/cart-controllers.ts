import { RequestHandler } from 'express';
import { customRequest } from '../types/custom-types';
import {
  validateObjectId,
  errorHandler,
  HTTP_STATUS
} from '../utils/error-handler';
import Product from '../models/Product';
import User from '../models/User';

// @route   POST /api/v1/cart/
// @desc    Gets user's cart
// @access  Private
export const getCart: RequestHandler = (req: customRequest, res, next) => {
  User.findById(req.userId)
    .then(user => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched cart',
        cart: user?.cart
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get cart currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/cart/:productId
// @desc    Adds product to cart
// @access  Private
export const addToCart: RequestHandler = (req: customRequest, res, next) => {
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
          if (user) {
            const userCart = user.cart;
            const existingProductIdx = userCart?.findIndex(
              cartItem => cartItem.product.toString() === productId
            );
            if (existingProductIdx >= 0) {
              userCart[existingProductIdx].quantity += 1;
            } else {
              userCart.unshift({
                product: product._id,
                quantity: 1,
                price: product.price
              });
            }
            user.cart = userCart;
          }
          return user?.save();
        })
        .then(modifiedUser => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully added product to cart',
            user: modifiedUser
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not add product to cart currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add product to cart currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE /api/v1/cart/:productId
// @desc    Deletes product from cart
// @access  Private
export const deleteProductFromCart: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  const serverErrorStr =
    'Something went wrong, could not delete product from cart currently';
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
          if (user) {
            const existingProductIdx = user.cart.findIndex(
              cartItem => cartItem.product.toString() === productId
            );
            if (!(existingProductIdx >= 0)) {
              return errorHandler(
                'Product not found in the cart to remove',
                HTTP_STATUS.BAD_REQUEST,
                next
              );
            }
            user.cart.splice(existingProductIdx, 1);
          }
          user
            ?.save()
            .then(modifiedUser => {
              res.status(HTTP_STATUS.OK).json({
                message: 'Successfully deleted product from cart',
                user: modifiedUser
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

// @route   DELETE /api/v1/cart/clear
// @desc    Deletes all products from cart
// @access  Private
export const clearCart: RequestHandler = (req: customRequest, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (user) {
        user.cart = [];
      }
      return user
        ?.save()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully cleared cart products'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not clear cart currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not clear cart currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
