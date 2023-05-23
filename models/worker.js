const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  Experience: {
    type: Number,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    enum: ["electrician", "keeper", "plumber"],
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("worker", workerSchema);
