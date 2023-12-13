const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    }
  },
  nationality: { type: String },
  coursesEnrolled: [
    {
      type: Schema.Types.ObjectId,
      required: true
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
