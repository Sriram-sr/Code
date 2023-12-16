const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name should be provided'],
      trim: true,
      maxLength: [100, 'Product name should not exceed 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0.0
    },
    description: {
      type: String,
      required: [true, 'Please provide description for the product']
    },
    ratings: {
      type: Number,
      default: 0
    },
    images: [
      {
        publicId: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: {
        values: [
          'Electronics',
          'Cameras',
          'Computers',
          'Mobiles/Tablets',
          'Laptop',
          'Furnitures',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Clothes/Shoes',
          'Beauty/Health',
          'Sports',
          'Outdoor',
          'Home'
        ],
        message: 'Please select the correct category for the product'
      }
    },
    seller: {
      type: String,
      required: [true, 'Please provide product seller']
    },
    stock: {
      type: Number,
      required: [true, 'Please provide product stock']
    },
    numOfReviews: {
      type: String,
      default: 0
    },
    reviews: [
      {
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);


module.exports = mongoose.model('Product', productSchema);