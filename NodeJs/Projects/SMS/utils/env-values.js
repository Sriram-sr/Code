require('dotenv').config();

exports.MONGODB_URI = process.env.MONGODB_URI;
exports.PORT = process.env.PORT;
exports.JWTSECUREKEY = process.env.JWTSECUREKEY;
exports.InternalServerErrorCode = process.env.SERVERERRORCODE;