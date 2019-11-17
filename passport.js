const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const TwitterTokenStrategy = require('passport-twitter-token');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const { 
   facebook_id,
   facebook_secret,
   twitter_id,
   twitter_secret,
   google_id,
   google_secret
} = require('./config/config');
const User = require('./models/User');


passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: facebook_id,
    clientSecret: facebook_secret,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
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

passport.use(new TwitterTokenStrategy({
    consumerKey: twitter_id,
    consumerSecret: twitter_secret,
    includeEmail: true
  }, async (token, tokenSecret, profile, done) => {
    try {
        let existingUser = await User.findOne({ "email": profile._json.email });
        
        if (existingUser) {
          return done(null, existingUser);
        }
  
        const newUser = new User({
          email: profile._json.email,
          name: profile._json.name,
          image: profile._json.profile_image_url
        });
  
        await newUser.save();
        done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
  }
));

passport.use('google-plus-token', new GooglePlusTokenStrategy({
  clientID: google_id,
  clientSecret: google_secret,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
      console.log('profile = ', profile);

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
}
));