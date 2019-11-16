const { 
    jwt_secret,
  } = require('../config/config');
   
const createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, jwt_secret,
    {
      expiresIn: '1h'
    });
};

module.exports = createToken;