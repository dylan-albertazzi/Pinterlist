const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  //Define a collection of lists which store ingredients
  listCollection: [
    {
      listName: {
        type: String,
        required: true,
      },
      create_date: {
        type: Date,
        default: Date.now,
      },
      groceryList: {
        itemCollection: [
          {
            ingredientName: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            measureUnit: {
              type: String,
              required: false,
            },
            recipeName: {
              type: String,
              required: false,
            },
            recipeURL: {
              type: mongoose.SchemaTypes.Url,
              required: false,
            },
          },
        ],
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
