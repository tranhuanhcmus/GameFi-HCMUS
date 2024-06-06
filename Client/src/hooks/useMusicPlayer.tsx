import { useEffect } from "react";
import { Audio } from "expo-av";

const soundLibrary = {
  soundTrackGame: require("../../assets/audio/soundTrackGame.mp3"),
  soundGame: require("../../assets/audio/broken.mp3"),
  // Add more sounds here ...
};

const useAudioPlayer = (sound: any, soundName: keyof typeof soundLibrary) => {
  const soundObject = new Audio.Sound();

  const playSound = async () => {
    try {
      if (sound) {
        await soundObject.loadAsync(soundLibrary[soundName], {
          isLooping: true,
        });
        await soundObject.playAsync();
      } else {
        await soundObject.stopAsync();
      }
    } catch (error) {
      console.log("Error playing sound", error);
    }
  };

  useEffect(() => {
    playSound();

    return soundObject
      ? () => {
          console.log("Unloading Sound");
          soundObject.unloadAsync();
        }
      : undefined;
  }, [sound]);
};
export default useAudioPlayer;
