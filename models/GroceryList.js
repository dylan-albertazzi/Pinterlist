const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

//Create Schema

const GroceryListSchema = new Schema({
  type: Array,
  required: false,

  id: {
    type: String,
    required: false,
  },

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
});

module.exports = GroceryList = mongoose.model("groceryList", GroceryListSchema);

// groceryList: {
//     itemCollection: {
//       type: Array,
//       required: false,

//       id: {
//         type: String,
//         required: false,
//       },

//       ingredientName: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       measureUnit: {
//         type: String,
//         required: false,
//       },
//       recipeName: {
//         type: String,
//         required: false,
//       },
//       recipeURL: {
//         type: mongoose.SchemaTypes.Url,
//         required: false,
//       },
//     },
//   },
