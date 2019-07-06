const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/send', contactsController.sendMail);

module.exports = router;