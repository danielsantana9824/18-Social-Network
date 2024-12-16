const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

  // Get all students
  async getUser(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
      };

      res.json(userObj);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update user
  async updateUser(req, res) {
    try {

      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        message: 'User updated successfully',
        user
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (thought && thought.users.length === null) {
        await Thought.findByIdAndRemove(req.params.thoughtId);
      }


      res.json({ message: 'user successfully deleted' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add friend
  async addFriend(req, res) {
    console.log('here');
    
    try {

      console.log(req.params);
      

      const { userId, friend } = req.params;

      // check if user or frined exists.
      const user = await User.findById(userId);
      const friends = await User.findById(friend);

      console.log('user',user);
      console.log('friend',friends);
      

      if (!user || !friends) {
        return res.status(404).json({ message: 'User or Friend not found' });
      }

      // avoid duplicated
      if (user.friends.includes(friend)) {
        return res.status(400).json({ message: 'User is already friends with this user' });
      }

      // add
      user.friends.push(friend);
      await user.save();


      res.status(200).json({ message: 'Friend added successfully', user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  },

  // delete friend
  async removeFriend(req, res) {
    try {
      const { userId, friend } = req.params;

      // check if user or frined exists.
      const user = await User.findById(userId);
      const friends = await User.findById(friend);

      console.log('user',user);
      console.log('friend',friend);

      if (!user || !friends) {
        return res.status(404).json({ message: 'User or Friend not found' });
      }

      // delete friend
      user.friends.pull(friend);
      await user.save();

      res.status(200).json({ message: 'Friend removed successfully', user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }

};
