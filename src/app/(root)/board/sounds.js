import { Howl } from "howler";

export const sounds = {
  movePiece: new Howl({
    volume: 0.5,
    src: ["/sounds/move-self.mp3"],
  }),
  capturePiece: new Howl({
    volume: 0.5,
    src: ["/sounds/capture.mp3"],
  }),
  check: new Howl({
    src: ["/sounds/move-check.mp3"],
    volume: 0.5,
  }),
  castle: new Howl({
    volume: 0.5,
    src: ["/sounds/castle.mp3"],
  }),
  promote: new Howl({
    volume: 0.5,
    src: ["/sounds/promote.mp3"],
  }),

  gameStart: new Howl({
    volume: 0.5,
    src: ["/sounds/notify.mp3"],
  }),
  gameEnd: new Howl({
    volume: 0.5,
    src: ["/sounds/checkmate.mp3"],
  }),
};

export const playSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].play();
  }
};
