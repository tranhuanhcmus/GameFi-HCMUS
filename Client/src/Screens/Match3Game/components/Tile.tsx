import React, { useEffect } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import { COLOR } from "../../../utils/color";

interface tileProps {
  location: Animated.ValueXY;
  scale: Animated.Value;
  key: number;
  img: number;
}

const Tile = (props: tileProps) => {
  useEffect(() => {
    if (!props.img) console.log("Khong co r");
  }, []);
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
let TILE_WIDTH = windowSpan / 10;

let styles = StyleSheet.create({
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: "absolute",
    backgroundColor: COLOR.RED,
  },
});

export default Tile;
