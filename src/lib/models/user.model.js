import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/50*50",
    },
    rating: { type: Number, default: 1000 },
    puzzlesSolved: { type: Number, default: 0 },
    lastPuzzleIndex: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);

export default User;
