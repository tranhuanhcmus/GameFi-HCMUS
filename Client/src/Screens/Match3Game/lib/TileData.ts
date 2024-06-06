import { Animated, Dimensions } from "react-native";
import { ImageObjType } from "./Images";
import { COLUMN, ROW } from "./spec";

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
export const TILE_WIDTH = windowSpan / 8;

export interface TileDataType {
  key: number;
  markedAsMatch: boolean;
  location: Animated.ValueXY;
  imgObj: ImageObjType | null;
  scale: Animated.Value;
}

export function TileData(imgObj: ImageObjType, key: number): TileDataType {
  return {
    key: key,
    markedAsMatch: false,
    location: new Animated.ValueXY({
      x: (TILE_WIDTH * ROW) / 2,
      y: (TILE_WIDTH * COLUMN) / 2,
    }),
    imgObj: imgObj,
    scale: new Animated.Value(1),
  };
}
