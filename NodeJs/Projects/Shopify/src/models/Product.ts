import mongoose, { Schema, Types, Document } from 'mongoose';
import { ReviewProto } from './Review';

interface ProductProto extends Document {
  productName: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl: string;
  likedUsers: Types.ObjectId[];
  reviews: ReviewProto[];
  createdUser: Types.ObjectId | null;
  averageRating?: number;
}

const productSchema = new Schema<ProductProto>(
  {
    productName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Mobiles',
        'Mobile Accessories',
        'Laptops',
        'Desktop PCs',
        'Computer Accessories',
        'Computer Peripherals'
      ]
    },
    stockQuantity: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    likedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    createdUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ProductProto>('Product', productSchema);
