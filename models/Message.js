const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);