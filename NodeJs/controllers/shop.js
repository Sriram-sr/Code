const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        prods: products,
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        pageTitle: 'Shop',
        prods: products,
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        path: '/products',
        pageTitle: product.title,
      });
    })
    .catch(err => {
      console.log(err);
    });

  //   Product.findAll({ // can use this alternate method to fetch some single record.
  //     where: {
  //       id: prodId,
  //     },
  //   })
  //     .then(product => {
  //       console.log(product);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //     res.redirect('/');
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
          });
        })
        .catch(err => {
          console.log('Error while Fetching products for Cart ', err);
        });
    })
    .catch(err => {
      console.log('Error while fetching cart table data', err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      cart
        .getProducts({ where: { id: prodId } })
        .then(products => {
          let product;
          if (products.length > 0) {
            product = products[0];
          }
          if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return fetchedCart.addProduct(product, {
              through: { quantity: newQuantity },
            });
          }
          return Product.findByPk(prodId)
            .then(product => {
              return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
              });
            })
            .catch(err => {
              console.log(
                'Error while fetching products from Products table with ID ',
                err
              );
            });
        })
        .then(() => {
          res.redirect('/cart');
        })
        .catch(err => {
          console.log('Error while fetching products for specific cart ', err);
        });
    })
    .catch(err => {
      console.log('Error while getting cart ', err);
    });
};

let count = 0;

exports.deleteCartItem = (req, res, next) => {
  count += 1;
  const prodId = req.body.prodId;
  req.user
    .getCart()
    .then(cart => {
      cart
        .getProducts({ where: { id: prodId } })
        .then(products => {
          const product = products[0];
          product.cartItem.destroy();
          res.redirect('/cart');
        })
        .catch(err => {
          console.log('Error while getting product in the cart ', err);
        });
    })
    .catch(err => {
      console.log('Error while getting Cart for the user ', err);
    });
};

exports.createOrder = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    console.log('Products are ',products);
  })
  .catch(err => {
    console.log('Error while fetching cart ', err);
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
