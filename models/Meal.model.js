const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"]
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        diet: {
            type: String,
            required: [true, "Please tell us in what category this meal falls into"],
            enum: ["vegetarian", "vegan", "gluten-free", "dairy-free", "allergens-free", "sugar-free", "kosher", "halal"],
        },
        cuisine: [{
            type: String,
            required: [true, "Please tell us in what category this meal falls into"],
            enum: ["italian", "mexican", "greek", "french", "indian", "thai", "mediterranean", "japanese", "chinese", "lebanese"],
        }],
        date: {
            type: Date,
            required: [true, "Please provide a preparation date"]
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model("Meal", mealSchema);

module.exports = User;
