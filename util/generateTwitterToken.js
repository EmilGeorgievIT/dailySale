const createToken = require('./createTwitterToken');

const generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

module.exports = generateToken;