const { validationResult } = require('express-validator/check');
const Message = require('../models/Message');
const User = require('../models/User');

function validateMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(422).json({
        message: 'Validation failed, entered data is incorrect',
        errors: errors.array()
      });
  
      return false;
    }
  
    return true;
  }

module.exports = {
    sendMessage: (req, res, next) => {
        if(validateMessage(req, res)) {            
            const { creator, description } = req.body;
            const message = new Message({creator, description, receiver: req.params.userId});
            let receiver;
    
            message.save()
            .then(() => {
                return User.findById(creator);
            })
            .then((creator) => {
                creator.sentMessages.push(message);
                creator.save();
            })
            .then(() => {
                return User.findById(req.params.userId);
            })
            .then((user) => {
                user.receivedMessages.push(message);
                receiver = user;
                return user.save();
            })
            .then(() => {
                res
                .status(201)
                .json({
                    message: message,
                    creator: { userId: req.userId, name: creator.name }
                })
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                res.status(500).json({
                    message: error.errors
                })
                next(error);
            });
        }
    },
    receivedMessage: (req, res, next) => {
        const userId = req.params.userId
        Message.find({receiver: userId})
        .then((message) => {
            res
            .status(200)
            .json(message)
        }).catch((error)=> {
            res
            .status(500)
            .json({
                message: "Internal server erorr"
            })
            next(error); 
        })
    },
    editMessage: (req, res) => {
        if (validatePost(req, res)) {
            const messageId = req.params.messageId;
            const message = req.body;
      
            Message.findById(messageId)
              .then((m) => {
                if (!m) {
                  const error = new Error('Message not found');
                  error.statusCode = 404;
                  throw error;
                }
      
                if (m.creator.toString() !== req.userId) {
                  const error = new Error('Unauthorized');
                  error.statusCode = 403;
                  throw error;
                }
      
                m.title = message.title;
                m.description = message.description;
      
                return m.save();
              })
              .then((m) => {
                if (m) {
                  res.status(200).json({
                    message: 'Post updated!',
                    post: m
                  })
                }
              })
              .catch((error) => {
                if (!error.statusCode) {
                  error.statusCode = 500;
                }
        
                next(error);
              });
          }
    },
    deleteMessage: (req, res, next) => {
        const messageId = req.params.messageId;
        let creator;
        Message.findById(messageId)
        .then((message) => {
            // if(!message) {
            //     const error = new Error("Message not found !");
            //     error.statusCode = 404;
            //     throw error;
            // }
            creator = message.creator.toString();
            return Message.findByIdAndDelete(messageId);
        })
        .then(() => {
            return User.findById(creator)
        })
        .then((user) => {
            user.messages.pull(messageId);
            return user.save();
        })
        .then(() => {
            res
            .status(200)
            .json({
                message: "Message deleted successfully !"
            })
        }).catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
      
            next(error);
        })
    }
}