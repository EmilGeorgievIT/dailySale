const { validationResult } = require('express-validator/check');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

function validateMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(422).json({
        message: 'Validation failed, entered data is incorrect',
        errors: errors.array()
      });
  
      return false;
    }
  
    return true;
}

module.exports = {
    postComment: (req, res, next) => {
        if(validateMessage(req, res)) {
            const { title, email, comment, postId, userId } = req.body;

            const addComment = new Comment({
                title, email, comment, postId, userId
            })

            addComment.save()
                .then(() => {
                    res
                    .status(201)
                    .json(
                        addComment
                    )
                })
                .catch((error) => {
                    if (!error.statusCode) {
                    error.statusCode = 500;
                    }
            
                    next(error);
                });
        }
    },
    getCommentsByPost: (req,res,next) => {
        if(validateMessage(req,res)) {
            const postId = req.params.postId;
            Comment.find({
                postId: postId
            }).then((comment) => {
                res
                .status(200)
                .json({
                    comments: comment
                })
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
        
                next(error);  
            });
        }
    }
}
