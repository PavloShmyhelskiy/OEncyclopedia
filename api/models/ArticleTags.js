const mongoose = require("mongoose");

const ArticleTagsSchema = new mongoose.Schema(
  {
    article_id: { type: String, required: true},
    tag_id: { type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArticleTags", ArticleTagsSchema);
