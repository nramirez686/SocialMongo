const { Thought } = require("../models");

const reactionController = {
  // POST a new reaction to a thought
  createReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      thought.reactions.push(newReaction);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE a reaction from a thought by reactionId
  deleteReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (reactionIndex === -1) {
        return res.status(404).json({ message: "Reaction not found" });
      }

      thought.reactions.splice(reactionIndex, 1);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = reactionController;
