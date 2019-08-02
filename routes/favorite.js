const router = require('express').Router();
const favoriteController = require('../controllers/favorite');
const isAuth = require('../middleware/is-auth');

router.post('/addFavorite', isAuth, favoriteController.addFavorite);
<<<<<<< HEAD
// router.get('/getFavorite/:userId', favoriteController.getFavorites);
=======
router.get('/getFavorites/:userId', isAuth, favoriteController.getFavorites);
>>>>>>> 0b57163906377d8088075b82bcb3a1bda10b51fb

module.exports = router;