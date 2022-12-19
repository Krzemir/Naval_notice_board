const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: 'string', required: true, minlength: 5, maxlength: 50},
  content: { type: 'string', required: true, minlength: 20, maxlength: 1000},
  date: { type:'string', required: true},
  photo: { type: 'string', required: true},
  price: { type: 'number', required: true},
  localization: { type: 'string', required: true},
  user: { type: 'ObjectId', required: true, ref: 'User' }
});

module.exports = mongoose.model('Ad', adSchema);