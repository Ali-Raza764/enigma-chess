import { playSound } from "./sounds";

const handleMoveSounds = (move, chess) => {
  if (move.captured && !move.promotion && !chess.isGameOver()) {
    const isCheckAfterMove = chess.isCheck();
    playSound(isCheckAfterMove ? "check" : "capturePiece");
  } else if (move.san.includes("+")) {
    playSound("check");
  } else if (chess.isGameOver()) {
    playSound("gameEnd");
  } else if (move.san === "O-O" || move.san === "O-O-O") {
    playSound("castle");
  } else if (move.promotion) {
    playSound("promote");
  } else {
    playSound("movePiece");
  }
};

export default handleMoveSounds;
