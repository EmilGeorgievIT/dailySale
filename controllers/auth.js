const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');
const request = require('request');
const { 
  jwt_secret,
  twitter_id,
  twitter_secret
} = require('../config/config');


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
  facebookOAuth: (req, res, next) => {
    const { user } = req.user;
    
    // Generate token
    const token = jwt.sign({ 
      email: req.user.email,
      userId: req.user._id.toString()
    }, jwt_secret, 
    { expiresIn: '1h' });

    res.status(200).json(
      { 
        message: 'logged', 
        token,
        image: req.user.image,
        userId: req.user._id.toString() 
      });
  },

  googleOAuth: (req, res, next) => {
    // Generate token
    const token = jwt.sign({ 
      email: req.user.email,
      userId: req.user._id.toString()
    }, jwt_secret, 
    { expiresIn: '1h' });

    res.status(200).json(
      { 
        message: 'logged', 
        token,
        image: req.user.image,
        userId: req.user._id.toString() 
      });
  },
  twitterLoginOAuth: (req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,    
      oauth: {
        consumer_key: twitter_id,
        consumer_secret: twitter_secret,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
      }, function (err, r, body) {
          if (err) {
            return res.send(500, { message: err.message });
          }
          const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
          const parsedBody = JSON.parse(bodyString);

          req.body['oauth_token'] = parsedBody.oauth_token;
          req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
          req.body['user_id'] = parsedBody.user_id;
          next();
      });
  },
  twitterReverseOAuth: (req, res, next) => {
      request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
          consumer_key: twitter_id,
          consumer_secret: twitter_secret
        }
      }, function (err, r, body) {
        if (err) {
          return res.send(500, { message: err.message });
        }

        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
      }) 
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