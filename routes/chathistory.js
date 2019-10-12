const express = require('express');
const chatHistoryController = require('../controllers/chat-history');
const router = express.Router()

router.get('/all', chatHistoryController.getAll);

router.get('/:id', chatHistoryController.getById)

router.post('/add', chatHistoryController.sendMessage);

router.get('/user/:user1/:user2', chatHistoryController.getChatHistory);

router.get('/user/:user1', chatHistoryController.getByUserID);

module.exports = router
