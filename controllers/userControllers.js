const { User } = require("../models");

const userController = {
  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single user by ID and populate thoughts and friends
  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate("thoughts friends");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT to update a user by ID
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE a user by ID
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      // Optionally, you can also remove the user's associated thoughts here
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
