const router = require('express').Router();
// const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/posts', feedController.getPosts);
router.get('/post/category/:categoryName', feedController.findPostByCategory);
router.post('/post/create', isAuth, feedController.createPost);
router.post('/post/find/', feedController.findPost);
router.delete('/post/delete/:postId', isAuth ,feedController.deletePost);
router.get('/post/:postId' ,feedController.getPostById);
router.put('/post/update/:postId', isAuth ,feedController.updatePost);

module.exports = router;