// Import necessary modules
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const dotenv = require('dotenv'); // Module to load environment variables
const cors = require('cors'); // Middleware to enable CORS

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Sample route to check if the API is running
app.get('/', (req, res) => {
  res.send('Recipe Sharing API is running!'); // Respond with a message
});

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Debug: Show MongoDB connection string
console.log('Mongo URI:', process.env.MONGO_URI);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });