const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoDB: process.env.MONGO_URL,
  port: process.env.PORT
};