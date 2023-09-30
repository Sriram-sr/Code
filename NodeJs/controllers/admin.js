const Product = require('../models/product');

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log('Error while fetching admin products ', err);
    });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    editing: false,
    pageTitle: 'Add-Product',
    path: '/admin/add-product'
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.prodId;
  Product.findById(productId)
    .populate('user')
    .then(product => {
      res.render('admin/edit-product', {
        product: product,
        editing: editMode,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product'
      });
    })
    .catch(err => {
      console.log('Error while fetching single product ', err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const user = req.user;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    user: user
  });
  product.save();
  res.redirect('/admin/products');
};

exports.updateProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  Product.findById(productId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      product.save();
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error while fetching product for editing ', err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByIdAndDelete(productId)
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error while deleting product ', err);
    });
};
