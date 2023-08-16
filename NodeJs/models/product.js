const products = [];
const utilPaths = require('../utils/path');
const path = require('path');
const fs = require('fs');

const filePath = path.join(utilPaths.rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(filePath, (err, readContent) => {
    if (err) {
      return cb([]);
    }
    // console.log('Readed content before passing ', JSON.parse(readContent));
    return cb(JSON.parse(readContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    console.log('ID generated is ', this.id);
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log('Error while writing file ', err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
        const product = products.find(p => p.id == id);
        cb(product);
    });
  }
};
