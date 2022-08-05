const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'This username is already taken'],
      required: [true, "Please provide a username"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    role: {
      type: String,
      enum: ["cook", "customer"],
      required: [true, "Please tell us if you are a cook, a customer or both"],
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
