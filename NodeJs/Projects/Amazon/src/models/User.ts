import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  hash(this.password, 2)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(err => next(err));
});

export default mongoose.model('User', userSchema);
