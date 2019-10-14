const ChatHistory = require('../models/ChatHistory');
const _  = require('lodash');

module.exports = {
    getAll: async (req, res) => {
        try {
            const chatHistories = await ChatHistory.getAll()
            res.send(chatHistories)
        } catch (err) {
            res.status(400).send('Got error in getAll')
        }
    },
    getChatHistory: async (req, res) => {
        const user1 = req.params.user1;
        const user2 = req.params.user2;
        
        try {
            console.log('user1', user1)
            const chatHistories = await ChatHistory.getChatHistory(user1, user2)
            //get users by ids
            // const users = await User.getByIds([user1, user2])
            // const users = [user1, user2]
            res.send({
                // users,
                chatHistories
            })
        } catch (err) {
            res.status(400).send('Got error in chatting history getByUserID')
        }
    },
    getByUserID: async (req, res) => {
        const user1 = req.params.user1;

        try {
            const chatHistories = await ChatHistory.getByUserId(user1)
            var fromIds = chatHistories.map(a => [a.fromId + "", a.toId + ""])
            const users = _.remove((_.uniq(_.flatten(fromIds))), (n) => n !== user1);
            console.log({users})
            res.send({
                users
            })
        } catch (err) {
            res.status(400).send('Got error in chatting history getByUserID')
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const chatHistories = await ChatHistory.getById(id)
            res.send(chatHistories)
        } catch (err) {
            res.status(400).send('Got error in chatting history getByUserID')
        }
    },
    sendMessage: async (req, res) => {
        const messageToAdd = ChatHistory({
            fromId: req.body.fromId,
            toId: req.body.toId,
            message: req.body.message
        })
        try {
            const savedMessage = await ChatHistory.sendMessage(messageToAdd)
            res.send(savedMessage)
        } catch (err) {
            res.status(400).send('Got error in savedMessage')
        }
    }
}