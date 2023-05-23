const mongoose = require('mongoose');

const restorationSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restorer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Restoration = mongoose.model('Restoration', restorationSchema);

module.exports = Restoration;
