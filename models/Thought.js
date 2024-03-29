const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // set default value to the current timestamp
    get: (createdAt) => dateFormat(createdAt), // a getter method to formate the timestamp on query
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, // set default value to the current timestamp
      get: (createdAt) => dateFormat(createdAt), // a getter method to formate the timestamp on query
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema], // array of nested reaction created with the "reactionSchema"
  },
  {
    toJSON: {
      // mongoose does not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual to retrieve the reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// helper function to format timestamps
function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
