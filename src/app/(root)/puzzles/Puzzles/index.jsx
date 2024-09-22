"use client";
import { useCallback, useEffect, useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "@/app/_components/ChessBoard";
import handleMoveSounds from "@/lib/sounds/handleMoveSounds";
import { fetchUserPuzzles } from "@/actions/puzzles/fetchPuzzles.action";
import { updateRating } from "@/actions/puzzles/updateRating.action";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChessQueen,
  FaLightbulb,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const Puzzles = ({ initialPuzzles, userRating }) => {
  const [puzzles, setPuzzles] = useState(initialPuzzles);
  const [fen, setFen] = useState(puzzles[0].FEN);
  const [chess, setChess] = useState(new Chess(puzzles[0].FEN));
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [moveNumber, setMoveNumber] = useState(0);
  const [arrows, setArrows] = useState([]);
  const [puzzleEnd, setPuzzleEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [updateFlag, setUpdateFlag] = useState(0); // New state to trigger rerender
  const [isPerfectSolve, setIsPerfectSolve] = useState(true);
  const [rating, setRating] = useState(userRating);
  const [mistakes, setMistakes] = useState(0);

  const { data: session, update } = useSession();

  useEffect(() => {
    if (!puzzles[currentPuzzle]) {
      return;
    }
    const firstMove = puzzles[currentPuzzle].Moves.split(" ")[0];
    setTimeout(() => {
      try {
        const from = firstMove.slice(0, 2);
        const to = firstMove.slice(2);
        const move = chess.move({
          from,
          to,
        });
        handleMoveSounds(move, chess);
        setFen(chess.fen());
        setMoveNumber(1);
      } catch (error) {}
    }, 1000);
  }, [currentPuzzle, puzzles]);

  const updateDatabaseRating = async (change) => {
    try {
      const payload = {
        ratingChange: change,
      };
      await updateRating(payload);
    } catch (error) {
      alert("Connection Error");
    }
  };

  const updateSessionRating = (change) => {
    update({
      ...session,
      user: {
        ...session.user,
        rating: session.user.rating + change,
        lastPuzzleIndex: session.user.lastPuzzleIndex + 1,
        puzzlesSolved: session.user.puzzlesSolved + 1,
      },
    });
  };

  const verifyMove = useCallback(
    (move) => {
      const moves = puzzles[currentPuzzle]?.Moves.split(" ") || [];
      if (move.lan === moves[moveNumber]) {
        if (moveNumber + 1 < moves.length) {
          const nextMove = moves[moveNumber + 1];
          setTimeout(() => {
            const move = chess.move({
              from: nextMove.slice(0, 2),
              to: nextMove.slice(2),
              promotion: "q",
            });
            handleMoveSounds(move, chess);
            setFen(chess.fen());
            setMoveNumber((prev) => prev + 2);
          }, 500);
        } else {
          setPuzzleEnd(true);
          setMessage("Puzzle completed!");
          if (isPerfectSolve) {
            setRating((prev) => prev + 15);
            updateDatabaseRating(15);
            updateSessionRating(15);
          }
        }
        return true;
      }

      // Incorrect move handling
      if (mistakes === 0) {
        //We would only decrease the rating once in each puzzle
        updateDatabaseRating(-20);
        updateSessionRating(-20);
        setRating((prev) => prev - 20);
      }
      setError("Incorrect move");
      setIsPerfectSolve(false);
      setMistakes((prev) => prev + 1);

      return false;
    },
    [currentPuzzle, chess, moveNumber, puzzles]
  );

  const handleMove = (move) => {
    setArrows([]);
    verifyMove(move);
    handleMoveSounds(move, chess);
  };

  const loadNewPuzzle = () => {
    const nextPuzzleIndex = currentPuzzle + 1;
    if (!puzzles[nextPuzzleIndex]) {
      setCurrentPuzzle((prev) => prev + 1);
      return;
    }

    const newChess = new Chess(puzzles[nextPuzzleIndex].FEN);

    // Reset all states for the new puzzle
    setCurrentPuzzle(nextPuzzleIndex);
    setChess(newChess);
    setFen(puzzles[nextPuzzleIndex].FEN);
    setMoveNumber(0);
    setPuzzleEnd(false);
    setMessage("");
    setMessage("");
    setError(""); // Clear error
    setArrows([]); // Reset any arrows drawn on the board
    setIsPerfectSolve(true);
    setMistakes(0);
  };

  const retryMove = () => {
    chess.undo();
    setFen(chess.fen()); // Update the FEN to reflect the undo
    setUpdateFlag((prev) => prev + 1); // Force re-render by updating a flag
    setError("");
  };

  const getHint = () => {
    const moves = puzzles[currentPuzzle]?.Moves.split(" ") || [];
    const move = moves[moveNumber];
    const from = move.slice(0, 2);
    const to = move.slice(2);
    setArrows([
      {
        orig: from,
        dest: to,
        brush: "blue",
        modifiers: {
          lineWidth: "12",
        },
      },
    ]);
    setError("");
    setIsPerfectSolve(false);
  };

  const fetchPuzzles = async () => {
    try {
      const newPuzzles = await fetchUserPuzzles();
      setPuzzles(newPuzzles);
      setCurrentPuzzle(0);
      setFen(puzzles[0].FEN);
      setChess(new Chess(puzzles[0].FEN));
    } catch (error) {
      console.error("some error occured while fetcching more puzzles", error);
    }
  };

  if (currentPuzzle === puzzles.length) {
    return (
      <main className="p-6 w-full h-full flex items-center justify-center">
        <h1 className="text-3xl font-semibold">You Solved all puzles</h1>
        <button className="p-3 rounded-md border" onClick={fetchPuzzles}>
          Fetch More Puzzles
        </button>
      </main>
    );
  }

  return (
    <main className="md:p-6 flex items-center justify-between flex-col md:flex-row">
      <ChessBoard
        allowMoveOpponentPieces={true}
        chess={chess}
        customArrows={arrows}
        initialFen={fen}
        onMove={handleMove}
        orientation={
          puzzles[currentPuzzle].FEN.split(" ")[1] === "w" ? "black" : "white"
        }
        key={`${fen}-${updateFlag}`} // Use updateFlag to force rerender when FEN changes
      />

      <div className="flex flex-col items-center justify-center w-full gap-4">
        {puzzleEnd ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              Puzzle Completed! <FaCheckCircle color="green" size={32} />
            </h2>
            <p className="text-lg my-3 text-center">{message}</p>
            <button
              className="p-3 rounded-md bg-blue-500 flex items-center gap-3"
              onClick={loadNewPuzzle}
            >
              Next Puzzle <FaArrowRight className="ml-2" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Your Rating: {rating} <FaChessQueen color="gold" size={32} />
            </h2>
            <button
              className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md w-32 flex items-center justify-center"
              onClick={getHint}
            >
              <FaLightbulb /> Hint
            </button>
            {error && (
              <div>
                <FaTimesCircle color="red" size={24} />
                <p className="text-red-500">{error}</p>
              </div>
            )}
            {error && (
              <button
                className="p-3 rounded-md border bg-red-500 flex items-center justify-center"
                onClick={retryMove}
              >
                Retry <FaUndoAlt className="ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
      {JSON.stringify(session?.user.rating)}
    </main>
  );
};

export default Puzzles;
