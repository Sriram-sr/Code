const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      _db = client.db('nodejslearn');
      callback();
    })
    .catch(err => {
      console.log('Error while connecting database ', err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database connection found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
