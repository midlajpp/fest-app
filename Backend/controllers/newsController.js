const asyncHandler = require("express-async-handler");
const News = require("../models/NewsModel");

const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort({ createdAt: -1 });
  res.status(200).json(news);
});

const getLatestNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).limit(5).sort({ createdAt: -1 });
  res.status(200).json(news);
});

const addNewsItem = asyncHandler(async (req, res) => {
  const { title, content, imageUrl } = req.body;

  if (!title || !content || !imageUrl) {
    res.status(400);
    throw new Error("Please add all fields: title, content, and image URL");
  }

  const newsItem = await News.create({
    title,
    content,
    imageUrl,
  });

  res.status(201).json(newsItem);
});

const updateNewsItem = asyncHandler(async (req, res) => {
  const newsItem = await News.findById(req.params.id);

  if (newsItem) {
    newsItem.title = req.body.title || newsItem.title;
    newsItem.content = req.body.content || newsItem.content;
    newsItem.imageUrl = req.body.imageUrl || newsItem.imageUrl;

    const updatedItem = await newsItem.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("News item not found");
  }
});

const deleteNewsItem = asyncHandler(async (req, res) => {
  const newsItem = await News.findById(req.params.id);

  if (newsItem) {
    await newsItem.deleteOne();
    res.json({ message: "News item removed" });
  } else {
    res.status(404);
    throw new Error("News item not found");
  }
});

module.exports = {
  getAllNews,
  getLatestNews,
  addNewsItem,
  updateNewsItem,
  deleteNewsItem,
};
