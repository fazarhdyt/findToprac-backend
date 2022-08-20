const mongoose = require('mongoose');

const ketopracSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  gmaps: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: false
  },
  imageUrl: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Ketoprac', ketopracSchema);