const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {

    username: {
      type: String,
      max_length: 100,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      max_length: 100,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'friend',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
