const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/',
        products: products
      });
    })
    .catch(err => {
      console.log('Error while fetching products for index page ', err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'Products',
        products: products
      });
    })
    .catch(err => {
      console.log('Error while fetching products for products page ', err);
    });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: 'product',
        path: '/product'
      });
    })
    .catch(err => {
      console.log('Error while fetching single product details ', err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.product')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        products: products,
        pageTitle: 'Your cart',
        path: '/cart'
      });
    })
    .catch(err => {
      console.log('Error while products in cart ', err);
    });
};

exports.getOrder = (req, res, next) => {
  Order.find()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      console.log('Error while fetching orders ', err);
    });
};

exports.postToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      req.user
        .addToCart(product)
        .then(result => {
          res.redirect('/cart');
        })
        .catch(err => {
          console.log('Error while adding product to cart ', err);
        });
    })
    .catch(err => {
      console.log('Error while finding product for adding cart ', err);
    });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      req.user
        .deleteFromCart(product)
        .then(result => {
          res.redirect('/cart');
        })
        .catch(err => {
          console.log('Error while deleting product from cart ', err);
        });
    })
    .catch(err => {
      console.log('Error while finding product for deleting from cart ', err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.product')
    .then(user => {
      const products = user.cart.items.map(item => {
        return { product: item.product, qty: item.qty };  // changing the way it fits order schema
      });
      const order = new Order({
        user: {
          name: user.email,
          userId: user
        },
        products: products
      });
      order
        .save()
        .then(result => {
          return user.clearCart();
        })
        .then(() => {
          res.redirect('/orders');
        })
        .catch(err => {
          console.log('Error while saving order ', err);
        });
    })
    .catch(err => {
      console.log('Error while populating user ', err);
    });
};
