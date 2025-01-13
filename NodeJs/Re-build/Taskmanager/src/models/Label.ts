import { Document, model, Schema } from 'mongoose';

interface LabelDocument extends Document {
  name: string;
  description: string;
  colorCode: string;
}

const labelSchema = new Schema<LabelDocument>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  colorCode: {
    type: String,
    required: true
  }
});

const Label = model<LabelDocument>('Label', labelSchema);

export { LabelDocument, Label };
