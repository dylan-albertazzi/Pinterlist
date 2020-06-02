// const express = require("express");
// const router = express.Router();
// const auth = require("../../middleware/auth");

// // Item Model
// // const Item = require('../../models/Item');
// //Item Model
// const User = require("../../models/User");
// // @route GET api/items
// // @desc Get All Items
// // @access Public
// router.get("/", (req, res) => {
//   User.find()
//     .sort({ create_date: -1 })
//     .then((lists) => res.json(lists.listCollection));
// });

// // @route POST api/items/list
// // @desc Post An Items
// // @access Private
// router.post("/list", auth, (req, res) => {
//     Item.find();
//     const newList = new Item({
//       name: req.body.name,
//     });

// // @route POST api/items
// // @desc Post An Items
// // @access Private
// router.post("/", auth, (req, res) => {
//   Item.find();
//   const newItem = new Item({
//     name: req.body.name,
//   });

//   newItem.save().then((item) => res.json(item));
// });

// // @route DELETE api/items/:id
// // @desc Delete selected item
// // @access Private
// router.delete("/:id", auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then((item) => item.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

// module.exports = router;
