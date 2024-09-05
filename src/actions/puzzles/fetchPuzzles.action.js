"use server";
import { auth } from "@/auth";
import User from "@/lib/models/user.model";

export const fetchUserPuzzles = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      throw new Error("User not found");
    }

    const res = await fetch(
      `https://chess-puzzles-api.vercel.app/puzzles?start=${
        user.lastPuzzleIndex
      }&limit=20&min_rating=${user.rating}&max_rating=${user.rating + 200}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch puzzles");
    }

    const newPuzzles = await res.json();
    return newPuzzles;
  } catch (error) {
    console.error("Error fetching user puzzles:", error.message);
    throw error;
  }
};
