// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    poster: { type: String, required: true }, // URL to the image
    groupLink: { type: String }, // WhatsApp/Discord group link
    tags: {
      type: [String], 
      default: []
    },
    description: { type: String, required: true },
    interested: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User", // Reference to User IDs
      default: []
    },
    organiser: { type: String, required: true },
    isBarcodeRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

