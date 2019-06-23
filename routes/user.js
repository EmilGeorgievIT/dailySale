const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/details/:userId', userController.getUserById);
router.put('/details/update/:userId', userController.updateProfile);
router.get('/image/:userId', userController.getUserProfileImage);

module.exports = router;