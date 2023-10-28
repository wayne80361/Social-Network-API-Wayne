const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, // email validation using regex
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // reference to the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // self-referential reference to the User model
      },
    ],
  },
  {
    toJSON: {
      // mongoose does not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual to retrieve the friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

// sample seeds
// User.create([
//   { username: "Wayne", email: "wayne@test.com", thoughts: [], friends: [] },
//   { username: "Akimo", email: "Akimo@test.com", thoughts: [], friends: [] },
//   { username: "Sharon", email: "sharon@test.com", thoughts: [], friends: [] },
// ]);

module.exports = User;
