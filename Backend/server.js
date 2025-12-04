require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const staticRoutes = require("./routes/staticRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const resultRoutes = require("./routes/resultRoutes");
app.get("/", (req, res) => {
  res.send("Fest Application Backend API Running...");
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/static", staticRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/results", resultRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
