const { validationResult } = require('express-validator/check');
const Favorite = require('../models/Favorite');

function validateFavorite(req, res) {
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
    addFavorite: (req, res, next) => {
        if(validateFavorite(req,res)) {
            const { userId, postId } = req.body;
            
            const favorite = new Favorite({
                userId,
                postId
            });

            Favorite.find({postId: postId})
            .then((obj) => {
                if(obj.length) {
                    const error = new Error('This post already exist !');
                    error.statusCode = 400;
                    throw error;
                }

                favorite.save()
                res.
                status(201).json(favorite);
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                res.status(500).json({
                    message: error.errors
                })
                next(error);
            });
        }
    },
    getFavorites: (req,res,next) => {
        if(validateFavorite(req,res)) {
            const userId = req.params.userId;
            Favorite
            .find({userId: userId})
            .then((favorite) => {
                res
                .status(200)
                .json(favorite)
            }).catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                res.status(500).json({
                    message: error.errors
                })
                next(error);
            });

        }
    }
};