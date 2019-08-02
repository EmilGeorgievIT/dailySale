const router = require('express').Router();
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');

router.get('/message/:userId', isAuth, messageController.receivedMessage);
router.post('/send/:userId', isAuth, messageController.sendMessage);
router.put('/edit',messageController.editMessage);
router.delete('/delete/:messageId', messageController.deleteMessage);

module.exports = router;
