import { Document, Schema, model } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
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
    resetToken: String,
    resetTokenExpiry: Date
  },
  {
    timestamps: true
  }
);

const User = model<UserDocument>('User', userSchema);

export { UserDocument, User };
