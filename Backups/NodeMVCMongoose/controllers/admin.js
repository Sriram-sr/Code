const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error while saving product ', err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'All products',
        prods: products,
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch(err => {
      console.log('Error while fetching admin products ', err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch(err => {
      console.log('Error while getting edit product page ', err);
    });
};

exports.updateProduct = (req, res, next) => {
  const updatedData = req.body;
  const productId = updatedData.productId;
  const updatedTitle = updatedData.title;
  const updatedimageUrl = updatedData.imageUrl;
  const updatedPrice = updatedData.price;
  const updatedDesc = updatedData.description;
  Product.findById(productId)
    .then(product => {
      if (product.userId !== req.user._id) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.imageUrl = updatedimageUrl;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save().then(result => {
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      console.log('Error while updating Product ', err);
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.findOneAndDelete({_id: req.body.productId, userId: req.user._id})
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log('Error while Deleting Product ', err);
    });
};