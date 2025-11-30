const asyncHandler = require("express-async-handler");
const Static = require("../models/StaticModel");

const getStaticContent = asyncHandler(async (req, res) => {
  let content = await Static.findOne({});

  if (!content) {
    content = await Static.create({});
  }

  res.status(200).json(content);
});

const updateStaticContent = asyncHandler(async (req, res) => {
  let content = await Static.findOne({});

  if (!content) {
    content = await Static.create({});
  }

  const updatedContent = await Static.findByIdAndUpdate(content._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedContent);
});

module.exports = {
  getStaticContent,
  updateStaticContent,
};
