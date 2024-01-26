import mongoose, { Schema, Types} from 'mongoose';

export interface TransactionProto {
    bookId: Types.ObjectId;
    memberId: Types.ObjectId;
    borrowDate: Date;
    returnDate: Date;
    status: string;
}

const transactionSchema = new Schema<TransactionProto>({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  borrowDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned']
  }
})

export default mongoose.model<TransactionProto>('Transaction', transactionSchema);