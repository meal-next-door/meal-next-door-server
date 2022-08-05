const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"]
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
