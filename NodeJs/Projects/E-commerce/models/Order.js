const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [
      {
        productName: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    paymentInfo: {
      paymentId: String,
      status: String
    },
    paidAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'Processing'
    },
    deliveredAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
