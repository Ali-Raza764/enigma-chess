"use server";
import { auth } from "@/auth";

export const fetchUserPuzzles = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(
      `https://chess-puzzles-api.vercel.app/puzzles?start=${
        session.user.lastPuzzleIndex
      }&limit=20&min_rating=${session.user.rating}&max_rating=${session.user.rating + 200}`
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
