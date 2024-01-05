import mongoose, { Schema } from 'mongoose';

const packageSchema = new Schema({
  packageName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Package', packageSchema);
