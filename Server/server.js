const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Resident = require("./models/residents.model");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));


app.get("/residents", async (req, res) => {
  try {
    const residents = await Resident.find().sort({ createdAt: -1 });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch residents" });
  }
});

app.post("/residents", async (req, res) => {
  try {
    const { firstName, lastName, role, profilePhoto, linkedin, twitter } =
      req.body;

    if (!firstName || !lastName || !role) {
      return res
        .status(400)
        .json({ error: "First name, last name, and role are required" });
    }

    const newResident = new Resident({
      firstName,
      lastName,
      role,
      profilePhoto,
      linkedin,
      twitter,
    });

    const savedResident = await newResident.save();
    res.status(201).json(savedResident);
  } catch (error) {
    res.status(500).json({ error: "Failed to add resident" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
