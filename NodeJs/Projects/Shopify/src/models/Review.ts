import mongoose, { Schema, Types, Document } from 'mongoose';

export interface ReviewProto extends Document {
  product: Types.ObjectId;
  rating: number;
  comment: string;
  likes: Types.ObjectId[];
  user: Types.ObjectId;
}

const reviewSchema = new Schema<ReviewProto>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ReviewProto>('Review', reviewSchema);
