const asyncHandler = require("express-async-handler");
const Result = require("../models/ResultModel");

const generatePoster = async (resultData) => {
  console.log("Generating poster for:", resultData.programName);

  return (
    "http://example.com/generated_posters/final_poster_" + Date.now() + ".jpg"
  );
};

const getPublishedResults = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { isPublished: true };

  if (category) {
    query.category = category;
  }

  const results = await Result.find(query).sort({ programName: 1 });
  res.status(200).json(results);
});

const createResultEntry = asyncHandler(async (req, res) => {
  const { programName, category, templateUrl, winnerData } = req.body;

  if (!programName || !category || !templateUrl) {
    res.status(400);
    throw new Error("Please provide program name, category, and template URL.");
  }

  const result = await Result.create({
    programName,
    category,
    templateUrl,
    winnerData: winnerData || [],
  });

  res.status(201).json(result);
});

const publishResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);

  if (result) {
    result.winnerData = req.body.winnerData || result.winnerData;

    const finalPosterUrl = await generatePoster(result);

    result.finalPosterUrl = finalPosterUrl;
    result.isPublished = true;

    const updatedResult = await result.save();
    res.json(updatedResult);
  } else {
    res.status(404);
    throw new Error("Result entry not found");
  }
});

const getAllAdminResults = asyncHandler(async (req, res) => {
  const results = await Result.find({}).sort({ createdAt: -1 });
  res.status(200).json(results);
});

module.exports = {
  getPublishedResults,
  createResultEntry,
  publishResult,
  getAllAdminResults,
};
