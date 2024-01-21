import mongoose, { Types, Document, Schema } from 'mongoose';

interface UserProto extends Document {
  email: string;
  password: string;
  profilePicture?: string;
  personalDetails: {
    email?: string;
    mobile?: string;
    gender?: 'male' | 'female' | 'others';
  };
  role: string;
  cart: { product: Types.ObjectId; quantity: number; price: number }[];
  orders: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  reviews: Types.ObjectId[];
  resetToken: string | undefined;
  resetTokenExpiry: Date | undefined;
}

const userSchema = new Schema<UserProto>(
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
    personalDetails: {
      email: String,
      mobile: String,
      gender: {
        type: String,
        enum: ['male', 'female', 'others']
      }
    },
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
        },
        price: {
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

export default mongoose.model<UserProto>('User', userSchema);
