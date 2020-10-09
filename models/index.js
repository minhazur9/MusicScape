const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
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