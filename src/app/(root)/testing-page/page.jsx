import { auth } from "@/auth";
import Puzzles from "./Puzzles";
import User from "@/lib/models/user.model";
import dbConnect from "@/lib/dbConnet";

const PuzzlesPage = async () => {
  const session = await auth();
  // const { rating, lastPuzzleIndex } = session.user;

  await dbConnect();
  const userData = await User.findOne({
    _id: session.user.id,
  }).lean();

  const { rating, lastPuzzleIndex } = userData;

  //* Fetch initial data
  const res = await fetch(
    `https://chess-puzzles-api.vercel.app/puzzles?start=${lastPuzzleIndex}&limit=20&min_rating=${rating}&max_rating=${
      rating + 200
    }`
  );

  const initialPuzzles = await res.json();
  
  return <Puzzles initialPuzzles={initialPuzzles} userRating={rating}/>;
};

export default PuzzlesPage;
