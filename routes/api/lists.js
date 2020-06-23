const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const uuid = require("uuid");

//Import User model
const User = require("../../models/User");
const { ObjectId } = require("mongodb");
const { db } = require("../../models/User");

// @route POST api/lists/:userid/:listid
// @desc add an item to a grocery list
// @access Private
router.post("/:userid/:listid", auth, (req, res) => {
  console.log("== In post ingredient: ", req.body);
  item_id = uuid.v4();
  //find a user with the given userid and with a list collection containing listid
  User.updateOne(
    {
      _id: req.params.userid,
      "listCollection._id": req.params.listid,
    },
    {
      //push the new ingredient to the list
      $push: {
        "listCollection.$.groceryList.itemCollection": {
          id: item_id,
          ingredientName: req.body.ingredientName,
          quantity: req.body.quantity,
        },
      },
    }
  )
    .then((user) => {
      returnItem = {
        id: item_id,
        ingredientName: req.body.ingredientName,
        quantity: req.body.quantity,
      };
      return res.status(202).json(returnItem);
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
  //find a user with the given userid and with a list collection containing listid
  User.find(
    {
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
  User.findById(req.params.userid, "listCollection")
    .then((user) => {
      if (!user) {
        return res.status(404).end();
      }
      user.listCollection.push({
        listName: req.body.listName,
        groceryList: {
          itemCollection: [],
        },
      });

      // user.save();
      user
        .save()
        .then((result) => {
          console.log(
            "== json return:",
            user.listCollection[user.listCollection.length - 1]
          );
          return res
            .status(202)
            .json(user.listCollection[user.listCollection.length - 1]);
        })
        .catch((err) => console.log(err));
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

// @route DELETE api/lists/:userid/:listid
// @desc Delete selected list
// @access Private
router.delete("/:userid/:listid", auth, (req, res) => {
  console.log("== in delete action");
  User.updateOne(
    {
      _id: req.params.userid,
      "listCollection._id": req.params.listid,
    },
    {
      //delete the ingredient from the list by searching through the listCollection with the listed id.
      $pull: {
        listCollection: { _id: req.params.listid },
      },
    }
  )
    .then((user) => {
      res.status(202).json(req.params.listid);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ success: false, fail_on: "This list does not exist." });
    });
});

// @route DELETE api/lists/:userid/:listid/:itemid
// @desc Delete selected item in list
// @access Private

router.delete("/:userid/:listid/:itemid", auth, (req, res) => {
  console.log("== in delete2 action");
  console.log("==itemid, ", req.params.itemid);

  User.updateOne(
    {
      listCollection: {
        $elemMatch: {
          "groceryList.itemCollection": {
            $elemMatch: { id: req.params.itemid },
          },
        },
      },
    },
    {
      $pull: {
        "listCollection.$.groceryList.itemCollection": {
          id: req.params.itemid,
        },
      },
    }
  )
    .then(() => {
      res.status(202).json(req.params.itemid);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ success: false, fail_on: "This item does not exist." });
    });
});

module.exports = router;
