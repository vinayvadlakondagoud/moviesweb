import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    role: {
      type: String,
      default: "user",
    },

    // ✅ FIXED (OUTSIDE ROLE)
    profilePic: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);