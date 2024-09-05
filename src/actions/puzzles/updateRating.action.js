"use server";

import { auth } from "@/auth";
import User from "@/lib/models/user.model";

export const updateRating = async (payload) => {
  try {
    const session = await auth();
    if (!session) {
      // Route protection
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
    const { ratingChange } = payload;

    // Check for incomplete credentials
    if (ratingChange === undefined) {
      return {
        status: 400,
        message: "Incomplete Credentials",
      };
    }

    // Update user data
    const userData = await User.findOneAndUpdate(
      { _id: session.user.id },
      {
        $inc: {
          rating: ratingChange, // Increment rating by 15
          lastPuzzleIndex: 1, // Increment lastPuzzleIndex by 1
          puzzlesSolved: 1, // Increment puzzlesSolved by 1
        },
      },
      { new: true } // Return updated document
    ).lean();

    return {
      status: 200,
      message: "Rating Updated Successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Some Error Occurred",
    };
  }
};
