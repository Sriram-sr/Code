import { RequestHandler } from 'express';
import { customRequest } from '../types/custom-types';
import { createProductReqBody } from '../types/req-body-types';
import {
  checkValidationFields,
  errorHandler,
  HTTP_STATUS,
  validateObjectId
} from '../utils/error-handler';
import Product from '../models/Product';

// @route   GET /api/v1/product/
// @desc    Gets all products
// @access  Public
export const getAllProducts: RequestHandler = (req, res, next) => {
  // Filters to work on...
  const currentPage = (req.query as { page?: string }).page || 1;
  const perPage = 2;

  Product.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(products => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched products',
        products
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get products currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET /api/v1/product/:productId
// @desc    Gets single product
// @access  Public
export const getSingleProduct: RequestHandler = (req, res, next) => {
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
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched product',
        product
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get product currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/product/
// @desc    Creates new product
// @access  Private(Admin)
export const createProduct: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  checkValidationFields(req);
  const { productName, description, price, category, stockQuantity } =
    req.body as createProductReqBody;

  Product.create({
    productName,
    description,
    price,
    category,
    stockQuantity,
    imageUrl: 'www.imagesindiarandom.com',
    createdUser: req.userId
  })
    .then(product => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully created product',
        product
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not create product currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PUT /api/v1/product/:productId
// @desc    Updates product
// @access  Private(Admin)
export const updateProduct: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
  checkValidationFields(req);
  const productId = (req.params as { productId: string }).productId;
  validateObjectId(productId);
  const updateFields = req.body as createProductReqBody;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (product.createdUser.toString() !== req.userId) {
        return errorHandler(
          'Cannot edit product created by others',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      Product.findByIdAndUpdate(productId, updateFields, { new: true })
        .then(updatedProduct => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully updated product',
            updatedProduct
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not update product currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update product currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE /api/v1/product/:productId
// @desc    Deletes a product
// @access  Private(Admin)
export const deleteProduct: RequestHandler = (
  req: customRequest,
  res,
  next
) => {
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
      if (product.createdUser.toString() !== req.userId) {
        return errorHandler(
          'Cannot delete product created by others',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      product
        .deleteOne()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted product'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not delete product currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete product currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
