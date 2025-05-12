// routes/joinRoutes.js
const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// POST: Receive form data
router.post("/", async (req, res) => {
  const { name, email, college, interest } = req.body;

  try {
    // Check if the email already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    // If email is not taken, create a new member
    const newMember = new Member({ name, email, college, interest });
    await newMember.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({ message: "Email already registered" });
  }
});

// GET: View all joined members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members" });
  }
});

module.exports = router;
