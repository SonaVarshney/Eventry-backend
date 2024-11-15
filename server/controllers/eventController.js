// controllers/eventController.js
const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all events by organizer
exports.getAllEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.organizer;
    const events = await Event.find({ organizer: organizer });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark interest for an event
exports.markInterest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Add userId to 'interested' array if not already added
    if (!event.interested.includes(req.body.userId)) {
      event.interested.push(req.body.userId);
      await event.save();
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEventsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const events = await Event.find({ tags: tag });
    if (events.length === 0)
      return res.status(404).json({ error: "No events found with this tag" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
