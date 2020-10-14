const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/music", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully...');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = {
    User: require('./User'),
    Playlist: require('./Playlist')
}