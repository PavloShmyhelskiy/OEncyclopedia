const router = require("express").Router();
const Group = require("../models/Group");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newGroup = new Group(req.body);
    try {
      const savedGroup = await newGroup.save();
      res.status(201).json(savedGroup);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Group.findByIdAndDelete(req.params.id);
      res.status(201).json("The Group has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
  const nameQuery = req.query.name;
  let group = [];
  try {
    if (nameQuery) {
        group = await Group.aggregate([
          { $match: { title: nameQuery } },
        ]);
    } else {
      group = await Group.find();
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
