const utilPaths = require('../utils/path');
const path = require('path');
const fs = require('fs');
const Cart = require('./cart');

const filePath = path.join(utilPaths.rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(filePath, (err, readContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(readContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          product => product.id === this.id
        );
        let updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
          console.log('Error while writing file ', err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), err => {
          console.log('Error while writing file ', err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const toDeleteProduct = products.find(product => product.id === id);
      const prodPrice = toDeleteProduct.price;
      const updatedProducts = products.filter(product => product.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
        console.log('Error', err);
      });
      Cart.deleteFromCart(id, prodPrice);
    });
  }
};
