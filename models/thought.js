const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {

        thoughtText: {
            type: String,
            minlength: 1,
            maxlength: 280, 
            message: 'Content must be between 1 and 280 characters',
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,  
            get: (value) => {
              return value.toLocaleString(); 
            }
          },

          username : {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
