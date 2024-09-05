import { playSound } from "@/app/_components/Board/sounds";

function handleMoveSounds(move, game) {
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
}

export default handleMoveSounds;
