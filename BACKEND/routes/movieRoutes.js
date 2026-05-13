import express from "express";
import Movie from "../models/Movie.js";
import {
  getMovies,
  getMovieById,
  createMovie
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);

import { protect } from "../middleware/authMiddleware.js";
router.post("/:id/rate", protect, async (req, res) => {
  try {
    const { userId, value } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!movie.ratings) movie.ratings = [];

    const existing = movie.ratings.find(r => r.userId === userId);

    if (existing) {
      existing.value = value;
    } else {
      movie.ratings.push({ userId, value });
    }

    const total = movie.ratings.reduce((acc, r) => acc + Number(r.value), 0);
    const avg = movie.ratings.length ? total / movie.ratings.length : 0;

    movie.rating = avg;

    await movie.save();

    // 🔥 DISTRIBUTION
    const distribution = { 1:0, 2:0, 3:0, 4:0, 5:0 };

    movie.ratings.forEach(r => {
      distribution[r.value]++;
    });

    res.json({
      rating: movie.rating,
      totalRatings: movie.ratings.length,
      distribution
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import { updateMovie } from "../controllers/movieController.js";
router.put("/:id", updateMovie);

export default router;