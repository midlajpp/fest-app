const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema(
  {
    laptopUrl: {
      type: String,
      required: [true, "Please add a laptop image URL"],
    },
    mobileUrl: {
      type: String,
      required: [true, "Please add a mobile image URL"],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ⬅️ കളക്ഷൻ പേര് നേരിട്ട് നൽകുന്നു
module.exports = mongoose.model("Gallery", GallerySchema, "galleries");
