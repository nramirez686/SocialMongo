const { Thought, User } = require("../models");

const thoughtController = {
  // GET all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      // Also push the new thought's _id to the associated user's thoughts array
      const userId = newThought.username; // Assuming you use the username to associate thoughts with users
      await User.findByIdAndUpdate(userId, {
        $push: { thoughts: newThought._id },
      });
      res.json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT to update a thought by ID
  updateThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE a thought by ID
  deleteThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const deletedThought = await Thought.findByIdAndRemove(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
