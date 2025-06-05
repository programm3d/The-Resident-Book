const mongoose = require('mongoose');


const residentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  profilePhoto: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resident = mongoose.model("Resident", residentSchema);


module.exports = Resident;