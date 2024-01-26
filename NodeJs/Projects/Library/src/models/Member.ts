import mongoose, { Schema } from 'mongoose';
import { TransactionProto } from './Transaction';
import { UserProto } from './User';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: number;
  country: string;
}

interface MemberProto {
  memberName: string;
  email?: string;
  address: Address;
  mobile: string;
  transactions: TransactionProto[];
  userId: UserProto;
}

const memberSchema = new Schema<MemberProto>({
  memberName: {
    type: String,
    required: true
  },
  email: String,
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  mobile: {
    type: String,
    required: true
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model<MemberProto>('Member', memberSchema);
