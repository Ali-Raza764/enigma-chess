"use client";
import { Chess } from "chess.js";
import { useEffect, useRef, useState, useCallback } from "react";
import KnightLoading from "@/app/_components/loaders/KnightLoading";

const ChessboardDnDProvider = dynamic(
  () => import("react-chessboard").then((mod) => mod.ChessboardDnDProvider),
  {
    ssr: false,
    loading: () => <KnightLoading />,
  }
);
import { playSound } from "./sounds";
import dynamic from "next/dynamic";
import { Chessboard } from "react-chessboard";

// Helper function to generate all chess squares
// todo use when the generateallpossiblemoves is working
// const generateSquares = () => {
//   const files = "abcdefgh";
//   const ranks = "12345678";
//   return files
//     .split("")
//     .flatMap((file) => ranks.split("").map((rank) => file + rank));
// };

const TestBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [boardFen, setBoardFen] = useState(game.fen());
  const [highlightedSquares, setHighlightedSquares] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [boardWidth, setBoardWidth] = useState(500);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newBoardWidth = Math.min(containerWidth, 500);
        setBoardWidth(newBoardWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoize the calculation of all possible moves we calculate some moves ahead of time so that we can decrease latency
  //todo make it calculate moves for both sides wjite and black
  // const allPossibleMoves = useMemo(() => {
  //   const moves = {};
  //   const squares = generateSquares();
  //   squares.forEach((square) => {
  //     const piece = game.get(square);
  //     if (piece) {
  //       moves[square] = game.moves({ square, verbose: true });
  //     }
  //   });
  //   return moves;
  // }, [game]);

  const handleDrop = useCallback(
    (sourceSquare, targetSquare, piece) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1]?.toLowerCase() || "q",
        });
        setBoardFen(game.fen());
        setHighlightedSquares({});
        setSelectedPiece(null);

        if (move.captured) {
          playSound("capturePiece");
        } else if (move.san.includes("+")) {
          playSound("check");
        } else if (game.isGameOver()) {
          playSound("gameEnd");
        } else if (move.san === "O-O" || move.san === "O-O-O") {
          playSound("castle");
        } else {
          playSound("movePiece");
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    [game]
  );

  const handlePieceClick = useCallback(
    (piece, square) => {
      const possibleMoves = game.moves({ square, verbose: true });
      const targetSquares = possibleMoves.map((move) => move.to);

      const newHighlightedSquares = {};

      targetSquares.forEach((targetSquare) => {
        newHighlightedSquares[targetSquare] = {
          backgroundSize: "50%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(circle, rgba(0, 0, 0, 0.4) 31%, transparent 35%)",
        };
      });

      setHighlightedSquares(newHighlightedSquares);
      setSelectedPiece({ piece, square });
    },
    [game]
  );

  const handleSquareClick = useCallback(
    (square) => {
      if (selectedPiece && highlightedSquares[square]) {
        handleDrop(selectedPiece.square, square, selectedPiece.piece);
      }
    },
    [selectedPiece, highlightedSquares, handleDrop]
  );

  return (
    <div ref={containerRef} className="w-full max-w-[800px] mx-auto">
      <ChessboardDnDProvider>
        <Chessboard
          id={"Puzzles board"}
          animationDuration={100}
          position={game.fen()}
          onPieceDrop={handleDrop}
          onPieceClick={handlePieceClick}
          onSquareClick={handleSquareClick}
          boardWidth={boardWidth}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
          }}
          customSquareStyles={{
            ...highlightedSquares,
            ...(selectedPiece && {
              [selectedPiece.square]: {
                background: "rgba(255, 255, 0, 0.4)",
              },
            }),
          }}
          snapToCursor={false}
        />
      </ChessboardDnDProvider>
    </div>
  );
};

export default TestBoard;
