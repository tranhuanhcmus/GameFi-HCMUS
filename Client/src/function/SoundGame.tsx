import { Audio } from "expo-av";

const soundLibrary = {
  soundGame: require("../../assets/audio/broken.mp3"),
  pressTyping: require("../../assets/audio/pressTyping.mp3"),
  eatingSound: require("../../assets/audio/game-eat-sound-83240.mp3"),
  moveSound: require("../../assets/audio/move.mp3"),
  brokenSound: require("../../assets/audio/broken.mp3"),
  // Add more sounds here ...
};
const soundGame = new Audio.Sound();

export const playSound = async (
  sound: any,
  soundName: keyof typeof soundLibrary,
) => {
  try {
    if (sound) {
      await soundGame.unloadAsync(); // Unload any soundGame that might be loaded already
      await soundGame.loadAsync(soundLibrary[soundName]); // Adjust path
      await soundGame.playAsync();
    } else {
      await soundGame.stopAsync();
    }

    // Additional settings can be adjusted here, e.g., volume, looping
  } catch (error) {
    console.log("Error playing sound", error);
  }
};
