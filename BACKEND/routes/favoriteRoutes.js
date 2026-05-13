import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// ❤️ Toggle Favorite
router.post("/", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const existing = await Favorite.findOne({ userId, movieId });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      return res.json({ liked: false });
    }

    await Favorite.create({ userId, movieId });
    res.json({ liked: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❤️ Check if liked
router.get("/:userId/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;

  const exists = await Favorite.findOne({ userId, movieId });

  res.json({ liked: !!exists });
});

export default router;