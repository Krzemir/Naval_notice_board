const mongoose = require('mongoose');
require('dotenv').config()

dbConnection = () =>{
  let dbUri = '';

const NODE_ENV = process.env.NODE_ENV;

if(NODE_ENV === 'production') dbUri = `mongodb+srv://krzemirdev:${process.env.DBPASS}@clustermainfree.52beawg.mongodb.net/noticeBoardDB?retryWrites=true&w=majority`;
else dbUri = 'mongodb://localhost:27017/noticeBoardDB';


mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('[server] Connected to the database');
});

db.on('error', err => console.log('Error ' + err));
}

module.exports = dbConnection;
