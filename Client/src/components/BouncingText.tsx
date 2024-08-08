import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, Easing, StyleSheet } from "react-native";

const BouncingText = ({ text = "Finding Opponent...", speed = 200 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);

      // When the last character is added, reset the state.
      if (++index === text.length + 1) {
        index = 0;
        setDisplayText("");
      }
    }, speed);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [text, speed]);

  return <Text style={styles.bouncingText}>{displayText}</Text>;
};

const styles = StyleSheet.create({
  bouncingText: {
    fontSize: 20,
    marginTop: 10,

    color: "white",
  },
});

export default BouncingText;
