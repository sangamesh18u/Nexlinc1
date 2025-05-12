// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const joinRoutes = require("./routes/joinRoutes"); // NEW: Join form route

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Nexlinc Backend!");
});

// Routes
app.use("/api/users", userRoutes);      // User registration routes
app.use("/api/events", eventRoutes);    // Event management routes
app.use("/api/join", joinRoutes);       // NEW: Join Us form routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
