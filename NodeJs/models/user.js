const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiry: Date,
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true
        },
        qty: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  const cartProductIdx = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];
  let cartProduct;
  let newQuantity = 1;
  if (cartProductIdx >= 0) {
    cartProduct = this.cart.items[cartProductIdx];
    cartProduct.qty += 1;
    updatedCartItems[cartProductIdx] = cartProduct;
  } else {
    cartProduct = {
      product: product._id,
      qty: newQuantity
    };
    updatedCartItems.push(cartProduct);
  }
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.deleteFromCart = function (product) {
  const updatedProducts = this.cart.items.filter(
    cp => cp.product.toString() !== product._id.toString()
  );
  this.cart.items = updatedProducts;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
