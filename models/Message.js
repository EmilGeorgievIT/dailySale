const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverName: {
        type: String
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    creatorName: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);