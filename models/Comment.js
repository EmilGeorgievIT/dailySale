const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);