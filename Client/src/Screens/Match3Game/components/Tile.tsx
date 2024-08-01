import React from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";

interface tileProps {
  location: Animated.ValueXY;
  scale: Animated.Value;
  key: number;
  img: number;
}

const Tile = (props: tileProps) => {
  return (
    <Animated.Image
      source={props.img}
      style={[
        styles.tile,
        {
          transform: [
            { translateX: props.location.x },
            { translateY: props.location.y },
            { scale: props.scale },
          ],
        },
      ]}
    />
  );
};

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = (windowSpan * 0.6) / 6;

let styles = StyleSheet.create({
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: "absolute",
  },
});

export default Tile;
