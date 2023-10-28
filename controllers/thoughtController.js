const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // GET all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single thought by _id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a new thought, and push to its userId
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT to update a thought by _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE to remove a thought by _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ message: "Thought removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a reaction to a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE to pull and remove a reaction from a thought
  async removeReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
