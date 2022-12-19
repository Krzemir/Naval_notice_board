const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dbConnection = require('./db')
require('dotenv').config()
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');


//******** express server start ***********/
const app = express();
app.listen('8000', () => {
  console.log('[server] Server is running on port: 8000');
});

//******** DB connection ***********/

dbConnection()

//******** middleware ***********/
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(mongoose.connection),
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  },
}));


//******** routes ***********/
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//******** serve React on other links ***********/ //TODO: not necessary, better way?
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

app.use((req, res) => {
  res.status(404).send('404 not found...');
})