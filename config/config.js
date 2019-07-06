const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoDB: process.env.MONGO_URL,
  port: process.env.PORT,
  mail_username: process.env.MAIL_USERNAME,
  mail_pass: process.env.MAIL_PASS
};