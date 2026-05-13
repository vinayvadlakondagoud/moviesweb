import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userroutes.js";
import Review from "./models/Review.js"; 
import Watchlist from "./models/Watchlist.js";
import Movie from "./models/Movie.js"; 
import Cast from "./models/Cast.js"; 
import favoriteRoutes from "./routes/favoriteRoutes.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// 2. Standard Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

app.use("/api/favorites", favoriteRoutes);
// 3. Interaction Routes (Reviews & Watchlist)
// Note: Use app.post/get directly here or move to a separate interactionRoutes.js file

// GET Reviews for a specific movie
app.get("/api/reviews/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new review
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check if movie is in watchlist
app.get("/api/watchlist/:userId/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const exists = await Watchlist.findOne({ userId, movieId });
    res.json({ exists: !!exists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import { protect } from "./middleware/authMiddleware.js";
// Toggle Watchlist (Add/Remove)
app.post("/api/watchlist", protect, async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const exists = await Watchlist.findOne({ userId, movieId });

    if (exists) {
      await Watchlist.deleteOne({ userId, movieId });
      res.json({ message: "Removed", exists: false });
    } else {
      await Watchlist.create({ userId, movieId });
      res.json({ message: "Added", exists: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Watchlist Page Data (Populated)
app.get("/api/watchlist/:userId", async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.params.userId }).populate("movieId");
    const movies = list.map(item => item.movieId); 
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to add a new actor
app.post("/api/cast", async (req, res) => {
  try {
    const { name, image } = req.body;
    const newActor = await Cast.create({ name, image });
    res.status(201).json(newActor); // This returns the _id you need!
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// 🎬 WATCHLIST COUNT
app.get("/api/watchlist-count/:userId", async (req, res) => {
  try {
    const count = await Watchlist.countDocuments({
      userId: req.params.userId,
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import Favorite from "./models/Favorite.js";
// ❤️ FAVORITE COUNT
app.get("/api/favorites-count/:userId", async (req, res) => {
  try {
    const count = await Favorite.countDocuments({
      userId: req.params.userId,
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Get user's watchlist
    const watchlist = await Watchlist.find({ userId }).populate("movieId");

    if (!watchlist.length) {
      return res.json([]);
    }

    // 2. Extract genres
    let genres = [];

    watchlist.forEach((item) => {
      if (item.movieId?.genre) {
        genres.push(...item.movieId.genre);
      }
    });

    // 3. Count genre frequency
    const genreCount = {};
    genres.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    });

    // 4. Get top genres
    const topGenres = Object.keys(genreCount)
      .sort((a, b) => genreCount[b] - genreCount[a])
      .slice(0, 3);

    // 5. Exclude already watched movies
    const watchedIds = watchlist.map((item) => item.movieId._id);

    // 6. Fetch recommended movies
    const recommendations = await Movie.find({
      genre: { $in: topGenres },
      _id: { $nin: watchedIds },
    }).limit(10);

    res.json(recommendations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/admin/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // delete user
    await User.findByIdAndDelete(userId);

    // delete related data
    await Review.deleteMany({ userId });
    await Watchlist.deleteMany({ userId });
    await Favorite.deleteMany({ userId });

    res.json({ message: "User and all data deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/cast", async (req, res) => {
  const actors = await Cast.find();
  res.json(actors);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));