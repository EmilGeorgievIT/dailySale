const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const favoriteRoutes = require('./routes/favorite');
const messageRoutes = require('./routes/message');
const chatHistoryRoutes = require('./routes/chathistory');
const mailRouter = require('./routes/contacts');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('./middleware/app-logger');

const path = require('path');
const { port } = require('./config/config');
require('./database/database')();
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);

let usersCollection = [];
let usersCollection2 = {};

logger.stream = {
  write(message) {
      logger.info(message)
  },
}

app.use(helmet());
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/mail', messageRoutes);
app.use('/profile', userRoutes);
app.use('/comment', commentRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/contact', mailRouter);
app.use('/chat', chatHistoryRoutes);


// General error handling

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

server.listen(port, () => { console.log(`REST API listening on port: ${port}`) });

// Socket.io operations
io.on('connection', function (socket) {
  console.log('A user has connected to the server.');

  socket.on('join', function ({username, userId, userSocketId}) {
      console.log('on join event', {username, userId, userSocketId})
      // Same contract as ng-chat.User
      usersCollection.push({
          participant: {
              id: socket.id, // Assigning the socket ID as the user ID in this example
              fromUserId: userId, // Assigning the socket ID as the user ID in this example
              displayName: username,
              status: 0, // ng-chat UserStatus.Online,
              avatar: null
          }
      });
      usersCollection2[socket.id] = {
          id: socket.id, // Assigning the socket ID as the user ID in this example
          fromUserId: userId, // Assigning the socket ID as the user ID in this example
          displayName: username,
          status: 0, // ng-chat UserStatus.Online,
          avatar: null
      };

      socket.broadcast.emit("friendsListChanged", usersCollection);
      socket.broadcast.emit("friendsListChanged2", usersCollection2);
      console.log("friendsListChanged2", usersCollection2);

      console.log(username + " has joined the chat room.");
      console.log("Users online.", usersCollection);

      // This is the user's unique ID to be used on ng-chat as the connected user.
      socket.emit("generatedUserId", socket.id);

      // On disconnect remove this socket client from the users collection
      socket.on('disconnect', function () {
          console.log('User disconnected!');

          var i = usersCollection.findIndex(x => x.participant.id == socket.id);
          usersCollection.splice(i, 1);

          delete usersCollection2[socket.id];

          socket.broadcast.emit("friendsListChanged", usersCollection);
          socket.broadcast.emit("friendsListChanged2", usersCollection2);
      });

  });

  socket.on("sendMessage", function (message) {
      console.log("Message received:", message);

      console.log('WE ARE HERE xxxxxxxxxxx '+ JSON.stringify(usersCollection.find(x => x.participant.id == message.fromId)));
      console.log('usersCollection', {usersCollection2, message});

      console.log('usersCollection2[message.toId]', usersCollection2[message.toId])
      if (usersCollection2[message.toId]) {
          console.log('usersCollection2[message.toId] inside if ')
          io.to(message.toId).emit("messageReceived", {
              user: usersCollection2[message.fromId],
              message: message,
          });
      }

      console.log("Message dispatched.");
  });

  socket.on('giveMeOnlineUsersList', function (userId) {
      io.to(userId).emit("friendsListChanged2", usersCollection2);
  });
});