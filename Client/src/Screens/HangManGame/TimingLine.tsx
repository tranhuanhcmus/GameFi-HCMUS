import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";

interface props {
  duration: number;
  onCompletion: () => void;
  turn: boolean;
}

const TimingLine: React.FC<props> = ({ turn, duration, onCompletion }) => {
  const animatedWidth = useRef(
    new Animated.Value(
      ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 40,
    ),
  ).current;

  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (duration == 30) {
      animatedWidth.setValue(
        ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 40,
      ); // Reset the width to full whenever the duration changes to a value greater than 0

      const animation = Animated.timing(animatedWidth, {
        toValue: 0,
        duration: duration * 1000, // Convert seconds to milliseconds
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        setTime((time) => time - 1);
        // If the animation is complete and not interrupted
        if (finished) {
          onCompletion && onCompletion();
        }
      });

      // Cleanup function to stop the animation if the component is unmounted
      return () => animation.stop();
    }
  }, [time]);

  return (
    <View style={styles.container}>
      <Animated.View
        className={turn ? "bg-green-500" : "bg-red-500"}
        style={[styles.timingLine, { width: animatedWidth }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    height: 5, // Set the height of the timing line
    backgroundColor: "rgba(0,0,0,0.1)", // Background of the timing line (container)
  },
  timingLine: {
    height: "100%",
    borderRadius: 15,
  },
});

export default TimingLine;
