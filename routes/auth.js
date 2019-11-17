const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const passportConf = require('../passport');

const { 
  jwt_secret,
} = require('../config/config');

router.post('/signup', 
  [
    // TODO: Add normalize email and check
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        })
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter password greater than 5 characters.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid name.')
  ]
, authController.signUp);
router.post('/signin', authController.signIn);

router.post('/facebook', passport.authenticate('facebookToken', { session: false }), authController.facebookOAuth);

router.post('/twitter', authController.twitterLoginOAuth, passport.authenticate('twitter-token', 
{session: false}), 
  function(req, res, next) {
  if (!req.user) {
    return res.status(404).send('User Not Authenticated');
  }

// prepare token for API
  req.auth = {
    id: req.user.id
  };

  // // Generate token
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
});

router.post('/twitter/reverse', authController.twitterReverseOAuth);

module.exports = router;
