const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemsOffered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  itemsRequested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
  ],
  cashOffered: {
    type: Number,
    default: 0,
  },
  cashRequested: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
