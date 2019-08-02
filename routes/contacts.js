const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.post('/send', contactsController.sendMail);

module.exports = router;