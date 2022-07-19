const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, unique: true },
      content: { type: String },
      thumbnail: { type: String },
      rate: { type: String },
      views: { type: Number },
      created_by: { type: String },
      links: { type:Array }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Article", ArticleSchema);