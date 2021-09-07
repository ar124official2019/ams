const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  hash: String
}, {
  timestamps: true
});

schema.pre("save", function (next) {
  if ((this.isNew || this.isModified('hash')) && this.hash) {
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(this.hash, salt);
    this.hash = hash;
  }

  next();
});

/**
 * get the json of plain user object
 */
schema.methods.toJSON = function() {
 const obj = this.toObject();
 delete obj.hash; // delete password
 return obj;
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

schema.statics.findByToken = function (token, callback) {
  try {

    const info = jwt.verify(token, process.env.SUPER_SECRET_1);
    mongoose.model('user').findOne({
      email: info.email
    }, (err, doc) => {
      if (callback)
        callback(err, doc);
    });

  } catch (err) {

    if (callback)
      callback(err)
    else
      throw err;

  }
};

module.exports = mongoose.model('user', schema);