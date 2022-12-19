const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {type: 'string', required: true},
  password: {type:'string', required: true},
  avatar: {type:'string', required: true},
  phone: {type:'string', required: true}
});

module.exports = mongoose.model('User', userSchema);
