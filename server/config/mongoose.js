const mongoose = require('mongoose');
const { getAppEvent } = require('./app');
const env = process.env;
let uri = env.DB_URI;
const appEvent = getAppEvent();

if (!uri) {
  uri = `mongodb://${env.DB_USER}:${env.DB_PWD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DBNAME}`;
}

mongoose.connect(uri, function (err) {
  if (err) {
    console.error('Error connecting to MongoDB!');
    process.exit(-1);
  } else {
    console.log('Connected to MongoDB!');
    appEvent.emit('database.connect');
  }
});