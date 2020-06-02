const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Import User model
const User = require("../../models/User");

// @route POST api/lists/:userid/:listid
// @desc add an item to a grocery list
// @access Private
router.post("/:userid/:listid", auth, (req, res) => {
  console.log("== hello hello");

  //find a user with the given userid and with a list collection containing listid
  User.updateOne({
    //USE THIS FIND CODE FOR GET
    _id: req.params.userid,
    "listCollection._id": req.params.listid,
  })
    .then((user) => {
      for (i in user.listCollection) {
        console.log("== loop");
        console.log(i);
        console.log(user.listCollection[i]._id);
        if (user.listCollection[i]._id == req.params.listid) {
          console.log("== found a match");
          user.listCollection[i].groceryList.itemCollection.unshift({
            ingredientName: req.body.ingredientName,
            quantity: req.body.quantity,
          });
          break;
        }
      }
      return res
        .status(202)
        .json(
          user.listCollection.find((list) => list._id == req.params.listid)
        );
      // console.log("== user: ");
      // console.log(user[0].find((list) => list._id == req.params.listid));
      // user
      //   .updateOne()
      //   .then((result) => {
      //     // console.log(req.body.itemName);
      //     // console.log(user);
      //     return res
      //       .status(202)
      //       .json(
      //         user.listCollection.find((list) => list._id == req.params.listid)
      //       );
      //   })
      //   .catch((err) => console.log(err));

      //return the newly created list
      // var newList = user[0].listCollection.find(
      //   (list) => list._id == req.params.listid
      // );
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false, fail_on: "find user" });
    });
});

// @route GET api/lists/:userid/:listid
// @desc get a specific grocery list
// @access Private
router.get("/:userid/:listid", auth, (req, res) => {
  console.log("== hello hello");

  //find a user with the given userid and with a list collection containing listid
  User.find(
    {
      //USE THIS FIND CODE FOR GET
      _id: req.params.userid,
      "listCollection._id": req.params.listid,
    },
    { listCollection: 1, _id: 0 }
  )
    .then((user) => {
      //return the newly created list
      var newList = user[0].listCollection.find(
        (list) => list._id == req.params.listid
      );
      res.status(202).json(newList);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false, fail_on: "find user" });
    });
});

// @route POST api/lists/:userid
// @desc Make a new grocery list
// @access Private
router.post("/:userid", auth, (req, res) => {
  console.log("We're in the post section");
  User.findById(req.params.userid, "listCollection")
    .then((user) => {
      console.log("== made it to user");
      if (!user) {
        return res.status(404).end();
      }

      user.listCollection.unshift({
        listName: req.body.listName,
        groceryList: {
          itemCollection: [],
        },
      });

      // user.save();
      user
        .save()
        .then((result) => {
          console.log(result);
          return res.status(202).json(user);
        })
        .catch((err) => console.log(err));
      // user.save(function (err, user) {
      //   res.status(200).json(user);
      // });
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route GET api/lists/:userid
// @desc Get All Lists for user
// @access Private
router.get("/:userid", (req, res) => {
  User.findById(req.params.userid, "listCollection")
    .then((user) => {
      var user = JSON.stringify(user);
      var user = JSON.parse(user);
      var lists = [];
      for (let i = 0; i < user.listCollection.length; i++) {
        lists.unshift(user.listCollection[i]);
      }
      console.log(user.listCollection.length);

      res.json(lists);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route POST api/items
// @desc Post An Items
// @access Private
router.post("/", auth, (req, res) => {
  Item.find();
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// // @route DELETE api/items/:id
// // @desc Delete selected item
// // @access Private
// router.delete("/:id", auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then((item) => item.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

module.exports = router;
