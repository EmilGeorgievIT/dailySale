const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoDB: process.env.MONGO_URL,
  port: process.env.PORT,
  mail_username: process.env.MAIL_USERNAME,
  mail_pass: process.env.MAIL_PASS,
  jwt_secret: process.env.JWT_SECRET,
  facebook_id: process.env.FACEBOOK_CLIENT_ID,
  facebook_secret: process.env.FACEBOOK_CLIENT_SECRET,
  twitter_id: process.env.TWITTER_CLIENT_ID,
  twitter_secret: process.env.TWITTER_CLIENT_SECRET,
  google_id: process.env.GOOGLE_CLIENT_ID,
  google_secret: process.env.GOOGLE_SECRET
};