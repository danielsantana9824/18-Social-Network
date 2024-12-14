const { Thought, Reaction } = require('../models');

module.exports = {

  // Get all thoughts
  async getCourses(req, res) {

    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a thought
  async getSingleThought(req, res) {

    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;

      const thought = await Thought.create({
        thoughtText,
        username,
      });

      const user = await User.findOne({ username: username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  },

  // update a Thought
  async updateThought(req, res) {
    try {

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        message: 'thought updated successfully',
        thought
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await Reaction.deleteMany({ _id: { thoughtId: thought.id } });

      res.json({ message: 'Thought and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a reaction
  async createReaction(req, res) {
    try {
      
      const reaction = new Reaction({
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      });

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId, 
        { $push: { reactions: reaction } }, 
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async  deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,  
        { $pull: { reactions: { _id: req.params.reactionId } } },  
        { new: true }  
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }


};
