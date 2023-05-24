const mongoose = require('mongoose');

const restorationRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shoeModel: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
});

const RestorationRequest = mongoose.model('RestorationRequest', restorationRequestSchema);

module.exports = RestorationRequest;
