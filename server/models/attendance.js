const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },

  student: {
    type: mongoose.Types.ObjectId,
    ref: 'student',
    required: true,
    autopopulate: true
  }
});

schema.plugin(autopopulate);

schema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.student = obj.student?.id
  return obj;
};

const Attendance = mongoose.model('attandance', schema);
module.exports = Attendance;