import { RequestHandler } from 'express';
import slugify from 'slugify';
import { createProductReqBody } from '../types/req-body-types';
import {
  errorHandler,
  HTTP_STATUS
  // validateObjectId
} from '../utils/error-handler';
import Product from '../models/Product';

// @route   POST /api/v1/product/
// @desc    Creates a product
// @access  Private(Admin)
export const createProduct: RequestHandler = (req, res, next) => {
  // Validation ToDo
  const { title, description, price, category, quantity, brand } =
    req.body as createProductReqBody;

  Product.create({
    title,
    slug: slugify(title),
    description,
    price,
    category,
    quantity,
    brand,
    ratings: []
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

// Product CRUD ToDo
