const mongoose = require("mongoose");

const AlignmentSchema = mongoose.Schema({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
});

const ResultSchema = mongoose.Schema(
  {
    programName: {
      type: String,
      required: [true, "Please add the program name"],
    },
    category: {
      type: String,
      enum: ["Senior", "Junior", "Sub Junior", "Group", "General"],
      required: true,
    },

    templateUrl: {
      type: String,
      required: true,
    },

    winnerData: {
      type: [
        {
          rank: { type: Number, required: true },
          name: { type: String },
          groupName: { type: String },
          resultNumber: { type: String },

          namePosition: AlignmentSchema,
          groupPosition: AlignmentSchema,
          resultNumPosition: AlignmentSchema,
        },
      ],
      default: [],
    },

    finalPosterUrl: {
      type: String,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);
