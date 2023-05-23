const Trade = require('../models/trade');

exports.createTrade = async (req, res) => {
  try {
    const { title, description, items, cash, condition } = req.body;

    const trade = new Trade({
      title,
      description,
      items,
      cash,
      condition,
      userId: req.user._id,
    });

    await trade.save();

    res.status(201).json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find();

    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const { id } = req.params;

    const trade = await Trade.findById(id);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, items, cash, condition } = req.body;

    const trade = await Trade.findByIdAndUpdate(
      id,
      { title, description, items, cash, condition },
      { new: true }
    );

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;

    const trade = await Trade.findByIdAndDelete(id);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
