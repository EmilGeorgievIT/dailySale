const router = require('express').Router();
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');

router.get('/message/:messageId', isAuth, messageController.getMessageById);
router.post('/send', isAuth, messageController.sendMessage);
router.put('/edit',messageController.editMessage);
router.delete('/delete/:messageId', messageController.deleteMessage);

module.exports = router;
