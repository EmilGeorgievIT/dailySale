const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const favoriteRoutes = require('./routes/favorite');
const messageRoutes = require('./routes/message');
const mailRouter = require('./routes/contacts');
const helmet = require('helmet');

const path = require('path');
const { port } = require('./config/config');
require('./database/database')();
const app = express();

app.use(helmet());
app.use(bodyParser.json({limit: '20mb'}));

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

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });