const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type:Array }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);
