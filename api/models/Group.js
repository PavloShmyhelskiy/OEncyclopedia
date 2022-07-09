const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type:Array }
      },
      { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
