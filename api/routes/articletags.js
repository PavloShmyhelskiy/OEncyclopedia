const router = require("express").Router();
const ArticleTags = require("../models/ArticleTags");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newArticleTag = new ArticleTags(req.body);
    try {
      const savedArticleTag = await newArticleTag.save();
      res.status(201).json(savedArticleTag);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const articleQuery = req.query.article;
    const tagQuery = req.query.tag;
    try {
        if (articleQuery) {
            if (tagQuery) {
                await ArticleTags.deleteOne({ article_id: articleQuery, tag_id: tagQuery});
                res.status(201).json("The Article Tag has been deleted...");
            }else{
                await ArticleTags.deleteMany({ article_id: articleQuery});
                res.status(201).json("The Tags with such Article have been deleted...");
            }
        }else{
            if (tagQuery){
                await ArticleTags.deleteMany({ tag_id: tagQuery});
                res.status(201).json("The Articles with such Tag have been deleted...");
            }else{
                res.status(404).json("You didn't specify search query")
            }
        }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
    const articleQuery = req.query.article;
    const tagQuery = req.query.tag;
    let articleTags = []
    try {
        if (articleQuery) {
            if (tagQuery) {
                articleTags = await ArticleTags.find({ article_id: articleQuery, tag_id: tagQuery});
            }else{
                articleTags = await ArticleTags.find({ article_id: articleQuery});
            }
        }else{
            if (tagQuery){
                articleTags = await ArticleTags.find({ tag_id: tagQuery});
            }else{
                articleTags = ArticleTags.find()
            }
        }
    res.status(200).json(articleTags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
