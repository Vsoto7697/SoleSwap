require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./server/routes/api/auth/authRoutes');
const customizationRoutes = require('./server/routes/api/customizations/customizationRoutes');
const tradeRoutes = require('./server/routes/api/trades/tradeRoutes');
const restorationRoutes = require('./server/routes/api/restorations/restorationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set secure headers using helmet
app.use(helmet());

// Apply rate limiting to prevent abuse and brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Parse request bodies as JSON
app.use(express.json());

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Add your other routes and middleware here
app.use('/api/trades', tradeRoutes);
app.use('/api/customizations', customizationRoutes);
app.use('/api/restorations', restorationRoutes);

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/size-swap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
