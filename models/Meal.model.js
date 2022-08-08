const { Schema, model } = require("mongoose");

const mealSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        diet: {
            type: String,
            required: [true, "Please tell us in what category this meal falls into"],
            enum: ["vegetarian", "vegan", "gluten-free", "dairy-free", "allergens-free", "sugar-free", "kosher", "halal", "none"],
        },
        cuisine: {
            type: String,
            required: [true, "Please tell us in what category this meal falls into"],
            enum: ["italian", "mexican", "greek", "french", "indian", "thai", "mediterranean", "japanese", "chinese", "lebanese", "spanish", "peruvian"],
        },
        date: {
            type: String,
            required: [true, "Please provide a preparation date"],
        },
        cook: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
