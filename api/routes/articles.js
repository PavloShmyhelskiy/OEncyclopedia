const router = require("express").Router();
const Article = require("../models/Article");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newArticle = new Article(req.body);
    try {
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedArticle);
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
      await Article.findByIdAndDelete(req.params.id);
      res.status(200).json("The Article has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LAST 5

router.get("/last", verify, async (req, res) => {
  try {
    const articles = await Article.find().sort({ _id: -1 }).limit(5);
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    const Articles = await Article.find();
    res.status(200).json(Articles.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE VIEWS

router.put("/view/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE RATE

router.put("/rate/:id", verify, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    const userRate = req.body.rate;
    const newRate = (article?.rate ?? "0;0").split(";");
    newRate[0] = +newRate[0] + userRate;
    newRate[1] = +newRate[1] + 1;
    
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: { rate: `${newRate[0]};${newRate[1]}` },
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
