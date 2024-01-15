import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
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
    createdUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', productSchema);
