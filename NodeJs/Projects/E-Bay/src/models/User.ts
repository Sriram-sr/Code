import mongoose, { Schema } from 'mongoose';

interface UserProto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  resetToken?: string;
  resetTokenExpiry: Date;
}

const userSchema = new Schema<UserProto>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    required: true
  },
  resetToken: String,
  resetTokenExpiry: Date
});

export default mongoose.model<UserProto>('User', userSchema);
