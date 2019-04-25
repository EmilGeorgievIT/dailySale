const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: false
  },
  image: {
    type: Schema.Types.String,
    required: false
  },
  location: {
    type: Schema.Types.String,
    required: false
  },
  salt: {
    type: Schema.Types.String,
    required: true
  },
  posts: [
    { 
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  messages: [
    { 
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

module.exports = mongoose.model('User', userSchema);