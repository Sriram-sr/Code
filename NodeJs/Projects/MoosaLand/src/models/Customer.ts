import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    childName: {
      type: String,
      required: true
    },
    dateOfBirth: { type: Date, required: true },
    mobile: { type: String, required: true },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
      enum: ['single', 'four_visit', 'six_visit', 'ten_visit', 'six_months']
    },
    noOfChild: {
      type: Number,
      required: true
    },
    noOfSocks: {
      type: Number,
      required: true,
      default: 0
    },
    discount: {
      type: Number,
      required: true,
      default: 0
    },
    usedVisits: {
      type: Number,
      default: 0
    },
    availableVisits: {
      type: Number,
      default: 0
    },
    userId: {
      type: String,
      unique: true
    },
    amountInWallet: {
      type: Number,
      default: 0
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ['card', 'cash', 'gpay']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Customer', customerSchema);
