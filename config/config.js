const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoDB: process.env.MONGO_URL,
  port: process.env.PORT,
  mail_username: process.env.MAIL_USERNAME,
  mail_pass: process.env.MAIL_PASS,
  jwt_secret: process.env.JWT_SECRET,
  facebook_id: process.env.FACEBOOK_CLIENT_ID,
  facebook_secret: process.env.FACEBOOK_CLIENT_SECRET
};