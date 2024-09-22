import { auth } from "@/auth";
import Puzzles from "./Puzzles";

const PuzzlesPage = async () => {
  const session = await auth();
  const { lastPuzzleIndex, rating } = session.user;

  //* Fetch initial data
  const res = await fetch(
    process.env.NEXT_PUZZLES_API_URL +
      `/puzzles?start=${lastPuzzleIndex}&limit=20&min_rating=${rating}&max_rating=${
        rating + 200
      }`
  );

  const initialPuzzles = await res.json();

  return <Puzzles initialPuzzles={initialPuzzles} userRating={rating} />;
};

export default PuzzlesPage;
