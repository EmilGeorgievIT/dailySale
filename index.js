const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const path = require('path');
const cors = require('cors');
const { port } = require('./config/config');
require('./database/database')();
const app = express();

app.use(bodyParser.json({limit: '20mb'}));


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/mail', messageRoutes);
app.use('/profile', userRoutes);

// General error handling

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
})

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });