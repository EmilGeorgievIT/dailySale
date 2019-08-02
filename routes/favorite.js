const router = require('express').Router();
const favoriteController = require('../controllers/favorite');
const isAuth = require('../middleware/is-auth');

router.post('/addFavorite', isAuth, favoriteController.addFavorite);
// router.get('/getFavorite/:userId', favoriteController.getFavorites);

module.exports = router;