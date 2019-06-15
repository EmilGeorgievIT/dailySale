const mongoose = require('mongoose');
const { mongoDB } = require('../config/config');
mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.connect(mongoDB , {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        } 

        console.log('Database ready');
    });

    db.on('error', reason => {
        console.log(reason);
    });
};