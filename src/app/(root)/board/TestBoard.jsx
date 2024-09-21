"use client"
import { useState } from "react";
import Chessboard from "@/app/_components/Chessboard";
import { Chess } from "chess.js";
import handleMoveSounds from "@/lib/sounds/handleMoveSounds";

function TestBoard() {
  const [fen, setFen] = useState(
    "rnbqkbnr/ppppppPp/8/8/8/8/PPPPP1PP/RNBQKBNR w KQkq - 0 1"
  );
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 For initial position
  const [chess] = useState(new Chess(fen));
  // const { handleMoveSounds } = useChessSounds(chess);
  const [customArrows, setCustomArrows] = useState([]);

  const handleMove = (move) => {
    handleMoveSounds(move, chess);
    // We can use somthing like this when the opponnent moves or when the game starts or you solve one move of the puzzle and the next move hTestBoardpens by itself
    // setTimeout(() => {
    //   try {
    //     const move = chess.move({ from: "e7", to: "e5" });
    //     handleMoveSounds(move);
    //     setFen(chess.fen());
    //   } catch (error) {}
    // }, 1000);
  };

  const showCustommArrows = () => {
    setCustomArrows([
      {
        orig: "a2",
        dest: "a6",
        brush: "blue",
        modifiers: {
          lineWidth: "12",
        },
      },
    ]);
  };
  return (
    <div className="md:p-6">
      <Chessboard
        initialFen={fen}
        chess={chess}
        orientation="white"
        onMove={handleMove}
        allowMoveOpponentPieces={true}
        customArrows={customArrows}
      />
      <button onClick={showCustommArrows} className="p-2 border rounded-md m-4">
        Show Hints Arrows
      </button>
    </div>
  );
}

export default TestBoard;