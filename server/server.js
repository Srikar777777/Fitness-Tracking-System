const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Assuming you have auth routes for register/login
const fitnessRecordRoutes = require('./routes/fitnessRecords'); 
const userRoutes = require('./routes/users');
const slotsRoute = require('./routes/slots');
const Slot = require('./models/Slot');
const bmiDietRoute = require('./routes/bmiDiet');  // Import BMI and Diet Plan routes
const paymentRoutes = require('./routes/payment');
const invoiceRoutes = require('./routes/invoice');

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) to allow communication between frontend and backend
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// Assuming you're using the Slot model

app.get('/api/slots/reserved', async (req, res) => {
    try {
      // Fetch all slots where booked = true
      const reservedSlots = await Slot.find({ reserved: true });
  
      res.status(200).json(reservedSlots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching reserved slots' });
    }
  });
  
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));
    

// Routes
app.use('/api/auth', authRoutes); // Authentication routes for register and login
app.use('/api/fitnessRecords', fitnessRecordRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/slots', slotsRoute);
app.use('/api/bmidiet', bmiDietRoute);  
app.use('/api/payment', paymentRoutes);
app.use('/api/invoice', invoiceRoutes);

// Base route for testing server status
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
