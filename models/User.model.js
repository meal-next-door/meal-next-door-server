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
      enum: ["cook", "customer", "both"],
      required: [true, "Please tell us in what category this meal falls into"],
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
