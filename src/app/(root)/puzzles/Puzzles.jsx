"use client";
import { fetchUserPuzzles } from "@/actions/puzzles/fetchPuzzles.action";
import { updateRating } from "@/actions/puzzles/updateRating.action";
import Board from "@/app/_components/Board";
import handleMoveSounds from "@/lib/sounds/handleMoveSounds";
import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { FaExclamation } from "react-icons/fa";
import { MdClose, MdQuestionMark } from "react-icons/md";

const Puzzles = ({ initialPuzzles, userData }) => {
  const [game, setGame] = useState(new Chess());
  const [puzzles, setPuzzles] = useState(initialPuzzles);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [side, setSide] = useState("white");
  const [position, setPosition] = useState("");
  const [moveNumber, setMoveNumber] = useState(0);
  const [arrows, setArrows] = useState([]);
  const [puzzleEnd, setPuzzleEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [isPerfectSolve, setIsPerfectSolve] = useState(true);

  const Chooseside = useCallback(() => {
    if (puzzles[currentPuzzle]) {
      const fenParts = puzzles[currentPuzzle].FEN.split(" ");
      const sideToMove = fenParts[1];
      setSide(sideToMove === "w" ? "black" : "white");
    }
  }, [currentPuzzle, puzzles]);

  useEffect(() => {
    if (puzzles[currentPuzzle]) {
      const newGame = new Chess(puzzles[currentPuzzle].FEN);
      setGame(newGame);
      Chooseside();
      setPosition(newGame.fen());

      // Make the first move
      const firstMove = puzzles[currentPuzzle].Moves.split(" ")[0];
      setMoveNumber(1);
      setTimeout(() => {
        const from = firstMove.slice(0, 2);
        const to = firstMove.slice(2);
        const move = newGame.move({ from, to, promotion: "q" });
        handleMoveSounds(move, newGame);
        setGame(newGame);
        setPosition(newGame.fen());
      }, 1000);
    }
  }, [currentPuzzle, puzzles, Chooseside]);

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

  //Todo see if we need to update the session or the other way just works
  const updateSession = () => {};

  const fetchPuzzles = async () => {
    try {
      const newPuzzles = await fetchUserPuzzles();
      setPuzzles(newPuzzles);
    } catch (error) {
      console.error("some error occured while fetcching more puzzles", error);
    }
  };

  const verifyMove = useCallback(
    (move) => {
      const moves = puzzles[currentPuzzle]?.Moves.split(" ") || [];

      setArrows([]);
      setPosition(game.fen());
      if (move === moves[moveNumber]) {
        setError({
          status: false,
          message: "",
        }); // Clear error message if the move is correct
        if (moveNumber + 1 < moves.length) {
          const nextMove = moves[moveNumber + 1];
          setTimeout(() => {
            const newGame = new Chess(game.fen());
            const move = newGame.move({
              from: nextMove.slice(0, 2),
              to: nextMove.slice(2),
              promotion: "q",
            });
            handleMoveSounds(move, newGame);
            setGame(newGame);
            setPosition(newGame.fen());
            setMoveNumber((prev) => prev + 2);
          }, 500);
        } else {
          setPuzzleEnd(true);
          isPerfectSolve && updateDatabaseRating(15); //Only increase The rating if the user Has solved the puzzle correctly
          setMessage("Puzzle completed!");
        }
        return true;
      }

      // Incorrect move handling
      updateDatabaseRating(-20);
      setIsPerfectSolve(false);
      setError({
        status: true,
        message: "Incorrect move, please try again.",
      });
      return false;
    },
    [currentPuzzle, game, moveNumber, puzzles]
  );

  const retryPuzzle = () => {
    game.undo();
    setPosition(game.fen());
    setError({
      status: false,
      message: "",
    });
  };

  const nextPuzzle = useCallback(() => {
    setCurrentPuzzle((prev) => prev + 1);
    setMoveNumber(0);
    setPuzzleEnd(false);
    setMessage("");
    setArrows([]);
    setError({
      status: false,
      message: "",
    });
    setIsPerfectSolve(true);
  }, []);

  const getHint = () => {
    const moves = puzzles[currentPuzzle]?.Moves.split(" ") || [];
    const move = moves[moveNumber];
    const from = move.slice(0, 2);
    const to = move.slice(2);
    setArrows([[from, to, "green"]]); // Add green arrow from the hint move
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
    <main className="h-full w-full flex items-center justify-center md:p-6 md:flex-row flex-col gap-6">
      <Board
        game={game}
        afterMove={verifyMove}
        position={position}
        customArrows={arrows}
        boardOrientation={side}
        allowMoveOpponentPieces={false}
      />
      <div className="w-full items-center justify-center flex flex-col space-y-4">
        {puzzleEnd ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-semibold text-green-600 flex items-center">
              {message}
              <span className="ml-2 p-2 rounded-full bg-blue-600">
                <FaExclamation className="text-white" size={20} />
              </span>
            </p>
            <button
              className="p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md w-32"
              onClick={nextPuzzle}
            >
              Next Puzzle
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {error.status === true && (
              <>
                <div className="flex items-center space-x-2">
                  <MdClose className="text-red-500" size={35} />
                  <p className="text-red-500 text-lg font-semibold">
                    {error.message}
                  </p>
                </div>
                <button
                  className="p-3 bg-red-500 hover:bg-red-700 text-white rounded-md w-32"
                  onClick={retryPuzzle}
                >
                  Retry Puzzle
                </button>
              </>
            )}
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex items-center space-x-2">
                <p className="text-red-500 text-lg font-semibold">
                  {side} to play
                </p>
                <span className="ml-2 p-2 rounded-full bg-green-600">
                  <MdQuestionMark className="" size={35} />
                </span>
              </div>
              <button
                className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white  rounded-md w-32"
                onClick={getHint}
              >
                Hint
              </button>
            </div>
          </div>
        )}
        {/* Puzzle Information Section */}
        <div className="w-full p-6 text-lg space-y-2 rounded-md">
          <p>Puzzle Rating: {puzzles[currentPuzzle].Rating}</p>
          <p>Played: {puzzles[currentPuzzle].NbPlays} times</p>
          <p>Popularity: {puzzles[currentPuzzle].Popularity}%</p>
          <a
            target="_blank"
            href={puzzles[currentPuzzle].GameUrl}
            className="text-blue-600 underline"
          >
            View Game
          </a>
          <p>Opening: {puzzles[currentPuzzle].OpeningTags || "No tags"}</p>
        </div>
      </div>
    </main>
  );
};

export default Puzzles;
