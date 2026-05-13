import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Favorite", favoriteSchema);