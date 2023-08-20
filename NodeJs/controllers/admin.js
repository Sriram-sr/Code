const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render('admin/products', {
      pageTitle: 'All products',
      prods: products,
      path: '/admin/products',
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findProductById(prodId, product => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: editMode,
      product: product
    });
  })
};

exports.updateProduct = (req, res, next) => {
  const updatedData = req.body;
  const productId = updatedData.productId;
  const updatedTitle = updatedData.title;
  const updatedimageUrl = updatedData.imageUrl;
  const updatedPrice = updatedData.price;
  const updatedDescription = updatedData.description;
  const updatedProduct = new Product(productId, updatedTitle, updatedimageUrl, updatedPrice, updatedDescription);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(req.body.productId);
  res.redirect('/');
}