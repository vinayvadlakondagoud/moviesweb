import Movie from "../models/Movie.js";

// @desc Get all movies
// @route GET /api/movies
export const getMovies = async (req, res) => {
  try {
    const search = req.query.search || "";
    const genre = req.query.genre || "";
    const industry = req.query.industry || "";

    const query = {
      title: { $regex: search, $options: "i" },
    };

    // ✅ GENRE FILTER
    if (genre) {
      query.genre = { $in: [genre] };
    }

    // ✅ INDUSTRY FILTER (NEW 🔥)
    if (industry) {
      query.industry = industry;
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });

    res.json(movies);

  } catch (error) {
    console.error("GET MOVIES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single movie
// @route GET /api/movies/:id
export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("cast");

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
};

// @desc Add new movie (Admin)
// @route POST /api/movies
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl,
      duration,
      cast,
      industry
    } = req.body;

    // 🔴 Basic validation
    if (!title || !description || !posterUrl) {
      return res.status(400).json({
        message: "Title, description, and poster are required"
      });
    }

    const movie = new Movie({
      title,
      description,
      genre,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl,
      duration,
      cast,
      industry
    });

    const createdMovie = await movie.save();

    res.status(201).json(createdMovie);

  } catch (error) {
    console.error("CREATE MOVIE ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};

// @desc Update movie
// @route PUT /api/movies/:id
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    Object.assign(movie, req.body);

    const updatedMovie = await movie.save();

    res.json(updatedMovie);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};