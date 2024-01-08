import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['Pending', 'Shipped', 'Delivered']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Order', orderSchema);
