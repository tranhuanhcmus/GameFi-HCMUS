import { useEffect } from "react";
import { Audio } from "expo-av";

const useAudioPlayer = (sound: any) => {
  const soundObject = new Audio.Sound();

  const playSound = async () => {
    try {
      if (sound) {
        await soundObject.loadAsync(
          require("../../assets/audio/soundTrackGame.mp3"),
          { isLooping: true },
        );
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
