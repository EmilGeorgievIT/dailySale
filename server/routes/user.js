const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/details/:userId', userController.getUserById);
router.put('/details/update/:userId', userController.updateProfile);

module.exports = router;