const User = require('../models/User');

module.exports = {
    getUserById: (req, res) => {
        const userId = req.params.userId;
        User.findById(userId)
        .then((user) => {
            const { posts } = user;

            res
            .status(200)
            .json(user)
        })
        .catch((error) => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
    },
    updateProfile: (req, res) => {
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