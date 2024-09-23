"use client";

// import ChessBoard from "@/app/_components/ChessBoard";
const ChessBoard = dynamic(() => import("@/app/_components/ChessBoard"), {
  ssr: false,
//   loading: <div>Loading</div>,
//   loader: <div>Loading</div>,
});
import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { useState } from "react";

const Analysis = () => {
  const [chess, setChess] = useState(new Chess());
  const [arrows, setArrows] = useState([]);

  return (
    <ChessBoard
      allowMoveOpponentPieces={true}
      chess={chess}
      customArrows={arrows}
      initialFen={chess.fen()}
      //   onMove={handleMove}
      orientation={"black"}
    />
  );
};

export default Analysis;
