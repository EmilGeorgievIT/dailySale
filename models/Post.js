const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    default: Date.now()
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);