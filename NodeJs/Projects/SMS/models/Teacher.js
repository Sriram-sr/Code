const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: String,
  mobile: {
    type: String,
    required: true
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
  gender: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  joinedDate: {
    type: Date,
    default: Date.now()
  },
  yearsOfExperience: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
