import { RequestHandler } from 'express';
import slugify from 'slugify';
import { createProductReqBody } from '../types/req-body-types';
import { productFilterQueryParams } from '../types/common-types';
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

// @route   GET /api/v1/product/
// @desc    Gets all products
// @access  Public
export const getProducts: RequestHandler = (req, res, _) => {
  let filterQuery = {};
  const { brand, category, price, page } =
    req.query as productFilterQueryParams;
  const currentPage = page || 1;
  const perPage = 2;

  if (brand) {
    filterQuery = { brand: brand };
  }
  if (category) {
    filterQuery = { ...filterQuery, category: category };
  }
  if (price) {
    filterQuery = {
      ...filterQuery,
      price: JSON.parse(
        JSON.stringify(price).replace(
          /\b(lt|lte|gt|gte)\b/g,
          match => `$${match}`
        )
      )
    };
  }

  Product.find(filterQuery)
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .then(products => {
      res.status(200).json({
        message: 'Successfully fetched products',
        products
      });
    });
};

// Product CRUD ToDo
