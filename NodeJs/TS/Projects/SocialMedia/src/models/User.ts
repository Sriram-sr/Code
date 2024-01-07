import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: 'New user default status'
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

export default mongoose.model('User', userSchema);
