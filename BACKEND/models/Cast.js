import mongoose from "mongoose";

const castSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // The URL for the actor's photo
}, { timestamps: true });

const Cast = mongoose.model("Cast", castSchema);
export default Cast;