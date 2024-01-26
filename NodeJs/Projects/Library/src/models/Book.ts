import mongoose, { Schema } from 'mongoose';

interface BookProto {
  title: string;
  author: string;
  genre: string;
  isbnNumber: number;
  status: string;
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
  }
});

export default mongoose.model<BookProto>('Book', bookSchema);
