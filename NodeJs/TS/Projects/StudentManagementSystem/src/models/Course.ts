import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true
    },
    courseCode: {
      type: String,
      required: true,
      unique: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    credits: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    ratings: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Course', courseSchema);
