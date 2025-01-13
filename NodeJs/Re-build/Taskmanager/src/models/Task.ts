import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './User';

interface Comment {
  text: string;
  commentedBy: UserDocument;
  date: Date;
}

interface TaskDocument extends Document {
  title: string;
  description: string;
  status: 'unassigned' | 'assigned' | 'in-progress' | 'completed';
  labels: Array<string>;
  createdBy: UserDocument;
  assignedTo: UserDocument | null;
  dueDate: Date;
  comments: Array<Comment>;
  collaborators: Array<UserDocument>;
  visibility: 'private' | 'public';
}

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unassigned', 'assigned', 'in-progress', 'completed'],
    default: 'unassigned'
  },
  labels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Label'
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Date,
    required: true
  },
  comments: {
    type: [
      {
        text: {
          type: String,
          required: true
        },
        commentedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  },
  collaborators: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    default: []
  },
  visibility: {
    type: String,
    enum: ['private', 'public'],
    default: 'private'
  }
});

const Task = model<TaskDocument>('Task', taskSchema);

export { TaskDocument, Task };
