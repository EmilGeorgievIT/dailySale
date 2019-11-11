const User = require('../models/User');

module.exports = {
    getUserById: (req, res, next) => {
        const userId = req.params.userId;
        User.findById(userId)
        .then((user) => {
            res
            .status(200)
            .json({
                image: user.image,
                messages: user.massages,
                _id: user._id,
                name: user.name,
                location: user.location,
                email: user.email,
                website: user.website,
                posts: user.posts,
                phoneNumber: user.phoneNumber
            })
        })
        .catch((error) => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
    },
    getUserProfileImage: (req,res,next) => {
        const userId = req.params.userId;
        
        User.findById(userId)
            .then((user) => {
                res
                .status(200)
                .json({
                    image: user.image
                })
            }).catch((error) => {
                if(!error.statusCode) { 
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    updateProfileImage(req,res,next) {
        const userId = req.params.userId;
        const { image } = req.body;

        User.findById(userId)
        .then((user) => {
            if(!user) {
                const error = new Error('User not found !');
                error.status = 404;
                throw error;
            }
            user.image = image;
            return user.save()
        }).then((user) => {
            res
            .status(201)
            .json({
                message: 'Successfully updated profile picture !'
            })
        })
        .catch((error) => {
            if(!error.statusCode) { 
                error.statusCode = 500;
            }
            next(error);
        });
    },
    updateProfile: (req, res, next) => {
        const userId = req.params.userId;
        const user = req.body;
        
        User.findById(userId)
        .then((userDetails) => {
            if(!userDetails) {
                const error = new Error('User not found !');
                error.status = 404;
                throw error;
            }
            userDetails.name = user.name;
            userDetails.phoneNumber = user.phoneNumber;
            userDetails.image = user.image;
            userDetails.website = user.website;
            userDetails.location = user.location;
            userDetails.email = user.email;
            
            return userDetails.save();
        })
        .then((userDetails) => {
            if(userDetails) {
                res.status(201).json({
                    message: 'User Updated !',
                    user: userDetails
                })
            }
        })
        .catch((error) => {
            if(!error.statusCode) { 
                error.statusCode = 500;
            }
            next(error);
        });
    }
}