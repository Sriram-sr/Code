import { RequestHandler } from 'express';
import { customRequest } from '../types/custom-types';
import { createProductReqBody } from '../types/req-body-types';
import {
  checkValidationFields,
  errorHandler,
  HTTP_STATUS
} from '../utils/error-handler';
import Product from '../models/Product';

// @route   GET /api/v1/product/
// @desc    Gets all products
// @access  Public
export const getAllProducts: RequestHandler = (req, res, next) => {
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
