import mongoose, { Document, Schema } from 'mongoose';
import { UserProto } from './User';

export interface BookProto extends Document{
  title: string;
  author: string;
  genre: string;
  isbnNumber: number;
  status?: string;
  createdUser?: UserProto;
}

export const bookGenres = [
  'General fiction',
  'Historical fiction',
  'Mystery/Thriller',
  'Science fiction',
  'Fantasy',
  'Romance',
  'Horror',
  'Biography/Memoir',
  'History',
  'Science',
  'Self-Help',
  'Travel'
];

const bookSchema = new Schema<BookProto>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: bookGenres
  },
  isbnNumber: {
    type: Number,
    unique: true,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'unavailable']
  },
  createdUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model<BookProto>('Book', bookSchema);
