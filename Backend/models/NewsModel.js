const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a news title"],
    },
    content: {
      type: String,
      required: [true, "Please add the full news content"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL for the news"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
