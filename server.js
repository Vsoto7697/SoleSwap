const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./server/routes/api/auth/authRoutes');
const customizationRoutes = require('./server/routes/api/customizations/customizationRoutes');
const tradeRoutes = require('./server/routes/api/trades/tradeRoutes');
const restorationRoutes = require('./server/routes/api/restorations/RestorationRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Add your other routes and middleware here
app.use('/api/trades', tradeRoutes);
app.use('/api/customizations', customizationRoutes);
app.use('/api/restorations', restorationRoutes);

mongoose.connect('mongodb://localhost:27017/size-swap', {
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
