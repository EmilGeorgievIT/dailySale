const router = require('express').Router();
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/is-auth');
router.post('/postComment', isAuth, commentController.postComment);
router.get('/getCommentsByPost/:postId', commentController.getCommentsByPost);

module.exports = router;