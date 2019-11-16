const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const { facebook_id, facebook_secret } = require('./config/config');
const User = require('./models/User');


passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: facebook_id,
    clientSecret: facebook_secret,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      console.log('profile', profile);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);

        let existingUser = await User.findOne({ "email": profile.emails[0].value });
        
        if (existingUser) {
          return done(null, existingUser);
        }
  
        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
          image: profile.photos[0].value
        });
  
        await newUser.save();
        done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
  }));