const mongoose = require("mongoose");

const StaticSchema = mongoose.Schema({
  // Home Page Quote
  quote: {
    type: String,
    default: "Embrace the art, ignite the spirit!",
  },
  // About Page Content (Fest description)
  aboutFest: {
    type: String,
    default: "Detailed description about the fest theme and history.",
  },
  // Fest Statistics (Edition, Stages etc.)
  festStats: {
    edition: { type: Number, default: 10 },
    stages: { type: Number, default: 5 },
    programs: { type: Number, default: 40 },
    categories: { type: Number, default: 15 },
    participants: { type: Number, default: 500 },
  },
});

module.exports = mongoose.model("Static", StaticSchema);
