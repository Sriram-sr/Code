import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
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
    quantity: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    images: {
      type: Array
    },
    brand: {
      type: String,
      required: true,
      enum: [
        'Lenovo',
        'Apple',
        'Samsung',
        'Hp',
        'Acer',
        'Dell',
        'Microsoft',
        'Asus',
        'Infinix'
      ]
    },
    ratings: [
      {
        stars: {
          type: Number,
          required: true
        },
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', productSchema);
