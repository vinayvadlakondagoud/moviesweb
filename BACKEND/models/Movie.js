import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  posterUrl: { type: String, required: true },
  backdropUrl: { type: String },
  trailerUrl: { type: String },

  ratings: [
    {
      userId: String,
      value: Number,
    },
  ],

  rating: { type: Number, default: 0 }, // ⭐ IMPORTANT

  genre: [String],
  industry: {
    type: String,
    enum: ["Bollywood", "Hollywood", "Tollywood", "Kollywood", "Mollywood"],
    required: true,
  },
  cast: [String],
  duration: { type: String },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;