import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: String,
    role: {
      type: String,
      required: true,
      enum: ['admin', 'customer'],
      default: 'customer'
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      }
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
      }
    ],
    resetToken: String,
    resetTokenExpiry: Date
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
