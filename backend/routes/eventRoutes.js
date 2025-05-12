// routes/eventRoutes.js

const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Create a new event
router.post("/add", async (req, res) => {
  const { title, date, description, location } = req.body;

  try {
    const newEvent = new Event({ title, date, description, location });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;