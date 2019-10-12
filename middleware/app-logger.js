const winston = require('winston');
const rotate = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../../log');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

let logger = new winston.createLogger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'app.log',
            dirname: dir,
            maxsize: 20971520, //20MB
            maxFiles: 25,
            datePattern: '.dd-MM-yyyy'
        })
    ]
});

module.exports = logger;