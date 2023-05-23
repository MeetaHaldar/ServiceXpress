const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },

  reviews: {
    type: String,
    required: false,
  },
  consumerId: {
    type: ObjectId,
    ref: "consumer",
    required: true,
  },
  workerId: {
    type: ObjectId,
    ref: "worker",
    required: true,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
