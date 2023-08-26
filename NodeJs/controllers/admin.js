const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const user = req.user;
  user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      userId: user.id
    })
    .then(result => {
      console.log('Created Product Successfully!!!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
  // Product.create({
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description,
  //   userId: user.id
  // })
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'All products',
        prods: products,
        path: '/admin/products',
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
  Product.findByPk(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: editMode,
        product: product,
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
  const updatedDescription = updatedData.description;
  Product.findByPk(productId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedimageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then(result => {
      console.log('Updated Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error while updating Product ', err);
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.destroy({
    where: {
      id: req.body.productId,
    },
  })
    .then(result => {
      console.log('Deleted Product Successfully!!!');
      res.redirect('/');
    })
    .catch(err => {
      console.log('Error while Deleting Product ', err);
    });
};
