const path = require('path');
const fs = require('fs');
const utilPaths = require('../utils/path');

const filePath = path.join(utilPaths.rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addToCart(id, prodPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIdx = cart.products.findIndex(
        product => product.prodId === id
      );
      const existingProduct = cart.products[existingProductIdx];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIdx] = updatedProduct;
      } else {
        updatedProduct = { prodId: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +prodPrice;
      fs.writeFile(filePath, JSON.stringify(cart), err => {
        console.log('Error ', err);
      });
    });
  }

  static deleteFromCart(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const products = cart.products;
      const totalPrice = cart.totalPrice;
      const productToRemove = products.find(product => product.prodId === id);
      if (productToRemove) {
        const prodQuantity = productToRemove.qty;
        const priceToReduce = prodQuantity * price;
        const updatedProducts = products.filter(product => product.prodId !== id);
        const updatedPrice = totalPrice - priceToReduce;
        cart.products = updatedProducts;
        cart.totalPrice = updatedPrice;
        fs.writeFile(filePath, JSON.stringify(cart), err => {
          console.log(`Error While Writing after removing cart item ${err}`);
        });
      } else {
        return;
      }
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    })
  }
};
