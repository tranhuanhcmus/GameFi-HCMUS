import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import ConstantsResponsive from "../../constants/Constanst";

interface Props {
  duration: number;
  onCompletion: () => void;
  turn: boolean;
  gameOver: boolean;
  leaveScreen: boolean;
}

const TimingLine: React.FC<Props> = ({
  turn,
  duration,
  onCompletion,
  gameOver,
  leaveScreen,
}) => {
  const animatedWidth = useRef(
    new Animated.Value(
      ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 240,
    ),
  ).current;

  useEffect(() => {
    if (leaveScreen) {
      animatedWidth.stopAnimation();
    } else {
      if (!gameOver) {
        animatedWidth.setValue(
          ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 240,
        );

        Animated.timing(animatedWidth, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) onCompletion();
        });
      } else {
        animatedWidth.stopAnimation();
      }

      // Cleanup function
      return () => {
        animatedWidth.stopAnimation();
      };
    }
  }, [turn, gameOver, leaveScreen]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.timingLine,
          { width: animatedWidth, backgroundColor: turn ? "green" : "red" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ConstantsResponsive.MAX_WIDTH - ConstantsResponsive.XR * 240,
    borderRadius: 15,
    height: ConstantsResponsive.YR * 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  timingLine: {
    height: "100%",
    borderRadius: 15,
  },
});

export default TimingLine;
