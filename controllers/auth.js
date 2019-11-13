const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');
const { jwt_secret } = require('../config/config');

function validateUser(req, res) {
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
  signUp: (req, res) => {
    if (validateUser(req, res)) {
      const { name, email, password, } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({ 
        name,
        email,
        hashedPassword,
        salt
      }).then((user) => {
        res.status(201)
          .json({ message: 'User created!', userId: user._id });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        // next(error);
      });
    }
  },
  facebookOAuth: async (req, res, next) => {
    // Generate token
    // const token = jwt.sign({ 
    //   email: user.email,
    //   userId: user._id.toString()
    // }, jwt_secret, 
    // { expiresIn: '1h' });
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },
  signIn: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
            const error = new Error('A user with this email could not be found');
            error.statusCode = 404;
            
            res.status(404).json({
                "message" : "User not found!"
            })
            throw error;
        }

        if(!user.authenticate(password)) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 404;
          
          res.status(404).json({
            "message" : "User not found!"
          })

          throw error;
        }

        const token = jwt.sign({ 
          email: user.email,
          userId: user._id.toString()
        }, jwt_secret, 
        { expiresIn: '1h' });

         res.status(200).json(
           { 
             message: 'logged', 
             token,
             image: user.image,
             userId: user._id.toString() 
           });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        // next(error)
      })
  }
}