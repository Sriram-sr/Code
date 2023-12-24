const Product = require('../models/Product');
const { errorHandler } = require('../utils/error-handler');
const { HTTP_STATUS } = require('../utils/error-handler');
const User = require('../models/User');
const Order = require('../models/Order');

// @route   GET /api/v1/shop/product
// @desc    Gets all products
// @access  Public
const getAllProducts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  Product.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .then(products => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully retreived products',
        totalProducts: products.length,
        products
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get the products curently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   Get /api/v1/shop/admin-products
// @desc    Gets products created by specific admin
// @access  Private(Only admin can access the route)
const getAdminProducts = (req, res, next) => {
  Product.find({ createdUser: req.userId })
    .then(products => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully retreived products',
        totalProducts: products.length,
        products
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get the products curently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET /api/v1/shop/product/:productId
// @desc    Gets single product
// @access  Public
const getSingleProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'Product not found for the given product ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully retreived the product',
        product
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get the product curently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/shop/product
// @desc    Adds a Product
// @access  Private(Only admin can access the route)
const addProduct = (req, res, next) => {
  if (!req.file) {
    return errorHandler('No image uploaded for product', 400, next);
  }
  const { title, price, description } = req.body;
  const product = new Product({
    title,
    price: `${price}$`,
    description,
    imageUrl: req.file.path,
    createdUser: req.userId
  });
  product
    .save()
    .then(savedProduct => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully added a product',
        product: savedProduct.toObject()
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add product currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET /api/v1/shop/cart/
// @desc    Gets cart products
// @access  Private
const getCartProducts = (req, res, next) => {
  User.findById(req.userId)
    .populate({
      path: 'cart.product'
    })
    .then(user => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched cart products',
        totalCartItems: user.cart.length,
        cartItems: user.cart
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get cart products currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/shop/cart/:productId
// @desc    Adds a product to cart
// @access  Private
const addToCart = (req, res, next) => {
  const serverErrorStr =
    'Something went wrong, could not add product to cart currently';
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'Product not found for the given product ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      User.findById(req.userId)
        .then(user => {
          const existingCartItemIdx = user.cart.findIndex(
            item => item.product._id.toString() === productId
          );
          if (existingCartItemIdx >= 0) {
            const cartItem = user.cart[existingCartItemIdx];
            cartItem.quantity += 1;
          } else {
            user.cart.unshift({
              product: productId,
              quantity: 1
            });
          }
          return user.save();
        })
        .then(modifiedUser => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully added product to cart',
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
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   POST /api/v1/shop/cart/:productId
// @desc    Adds a product to cart
// @access  Private
const deleteFromCart = (req, res, next) => {
  const serverErrorStr =
    'Something went wrong, could not delete product from cart currently';
  const { productId } = req.params;
  User.findById(req.userId)
    .then(user => {
      const CartItemIdx = user.cart.findIndex(
        item => item.product.toString() === productId
      );
      console.log(`Idx is ${CartItemIdx}`);
      if (!(CartItemIdx >= 0)) {
        return errorHandler(
          'Product not found in user cart',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      user.cart = user.cart.filter(
        item => item.product._id.toString() !== productId
      );
      user
        .save()
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
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   GET /api/v1/shop/order
// @desc    Gets order of the user
// @access  Private
const getOrders = (req, res, next) => {
  Order.find({ user: req.userId })
    .select('-user')
    .populate({
      path: 'products.product',
      select: 'title description -_id'
    })
    .then(order => {
      console.log(order);
      res.status(200).json({
        message: 'Successfully fetched orders for user',
        order
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get orders currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/shop/order
// @desc    Orders all products in the cart
// @access  Private
const placeOrder = (req, res, next) => {
  let orderUser;
  User.findById(req.userId)
    .then(user => {
      orderUser = user;
      const order = new Order({
        products: user.cart,
        user: user._id
      });
      return order.save();
    })
    .then(() => {
      // clg
      orderUser.cart = [];
      return orderUser.save();
    })
    .then(() => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Order placed successfully'
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not place order currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getAdminProducts,
  addProduct,
  getCartProducts,
  addToCart,
  deleteFromCart,
  getOrders,
  placeOrder
};
