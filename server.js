const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./server/routes/authRoutes');
const customizationRoutes = require('./routes/customizationRoutes');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Add your other routes and middleware here
app.use('/api/trades', tradeRoutes);
app.use('/api/customization', customizationRoutes);

mongoose.connect('mongodb://localhost/size-swap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
