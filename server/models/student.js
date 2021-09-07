const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    min: 1
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const Student = mongoose.model('student', schema);
module.exports = Student;