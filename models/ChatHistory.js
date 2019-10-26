const mongoose =  require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema;

const ChatHistorySchema = new Schema({
    fromId: ObjectId,
    toId: ObjectId,
    message: String
}, {
    timestamps: true
}, {collection: 'ChatHistory'})

let ChatHistoryModel = mongoose.model('ChatHistory', ChatHistorySchema)

ChatHistoryModel.getAll = () => {
    return ChatHistoryModel.find({})
}

ChatHistoryModel.getById = (id) => {
    return ChatHistoryModel.find({_id: id})
}

ChatHistoryModel.sendMessage = (messageToAdd) => {
    return messageToAdd.save()
}

ChatHistoryModel.getChatHistory = (user1, user2) => {

    return ChatHistoryModel.find(
        {

            $or: [{

                $and: [{
                    fromId: user1,
                },
                    {
                        toId: user2
                    }]
            },
                {
                    $and: [{
                        fromId: user2,
                    },
                        {
                            toId: user1
                        }]
                }]

        })
}

ChatHistoryModel.getByUserId = (id) => {

    return ChatHistoryModel.find(
        {
            $or: [{
                fromId: id
            },
                {
                    toId: id
                }]

        })//.sort({'message': 'desc'})
    //.select('fromId').select('toId')
}

module.exports = ChatHistoryModel;
