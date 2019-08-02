const { validationResult } = require('express-validator/check');
const nodemailer = require("nodemailer");
const { mail_username, mail_pass } = require('../config/config');


function validateMail(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(422).json({
        message: 'Please provide valid message!'
      });
  
      return false;
    }
  
    return true;
  }

module.exports = {
    sendMail: (req, res, next) => {
        if(validateMail(req, res)) {            
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error('Failed to create a testing account');
                    console.error(err);
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    res.status(500).json({
                        message: error.errors
                    })
                    next(error);
                    return process.exit(1);
                }
            
                console.log('Credentials obtained, sending message...');

                let transporter = nodemailer.createTransport(
                    {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: mail_username,
                            pass: mail_pass
                        },
                        logger: true,
                        debug: true // include SMTP traffic in the logs
                    },
                    {
                        from: 'Admin <example@nodemailer.com>',
                    }
                );
            
                // Message object
                let message = {
                    to: '<tedopro@gmail.com>',
                    subject: `Message form ${req.body.email}`,
                    text: req.body.message,
                    html: 
                    `<p>
                        <b>Hello my name is ${req.body.name}</b>
                    </p>

                    <p>
                        ${req.body.message}
                    </p>
                    `,
                };
            
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        if (!error.statusCode) {
                            error.statusCode = 500;
                        }
                        res.status(500).json({
                            message: error.errors
                        })
                        next(error);
                        return process.exit(1);
                    }
                    res.status(200).json({
                        message: 'Message sent successfully'
                    })
                    console.log('Message sent successfully!');
                    console.log(nodemailer.getTestMessageUrl(info));
                    transporter.close();
                });
            });
        }
    }
}