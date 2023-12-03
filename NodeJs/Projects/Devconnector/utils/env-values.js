require('dotenv').config();

exports.MONGODB_URI = process.env.MONGODB_URI;
exports.PORT = process.env.PORT || 8080;
exports.JWTSECUREKEY = process.env.JWTSECUREKEY;
