const mongodb = require('mongodb');
const dbUtils = require('../utils/database');

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = dbUtils.getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(
          'Error while inserting product into Products collection ',
          err
        );
      });
  }

  static fetchAll() {
    const db = dbUtils.getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log('Error while fetching products ', err);
      });
  }

  static findById(prodId) {
    const db = dbUtils.getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log('Error while fetching single product ', err);
      });
  }
}

module.exports = Product;
