const router = require("express").Router();
const Tag = require("../models/Tag");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newTag = new Tag(req.body);
    try {
      const savedTag = await newTag.save();
      res.status(201).json(savedTag);
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
      await Tag.findByIdAndDelete(req.params.id);
      res.status(201).json("The tag has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id);
      const { name, ...info } = user._doc;
      res.status(200).json(name);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL
  router.get("/", verify, async (req, res) => {
    let tags = [];
      try {
          tags = await Tag.find();
        res.status(200).json(tags);
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;
