import { Animated } from "react-native";

export default class GameLogic {
  /**
   * Size in pixel of table, please change if needed.
   */
  public static SIZE_TABLE = 280;
  /**
   * This will create a brand new random element in diamond game.
   * @returns a random number
   */
  public static randomNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  public static printTable = (table: any) => {
    const CELLS_IN_ROW = 8;
    const CELLS_IN_COLUMN = 8;

    // Iterate through each cell in the matrix
    for (let i = 0; i < CELLS_IN_ROW; i++) {
      let row = "";
      for (let j = 0; j < CELLS_IN_COLUMN; j++) {
        row = row + table[i][j] + " ";
      }
      console.log(row, "\n");
    }
  };

  /**
   * Function to generate 2D Matrix Animated.Value
   * @param value
   * @param CELLS_IN_ROW
   * @param CELLS_IN_COLUMN
   * @returns
   */
  public static generateAnimatedValue = (
    value: number,
    CELLS_IN_ROW = 8,
    CELLS_IN_COLUMN = 8,
  ) => {
    const animation = Array(CELLS_IN_COLUMN);
    for (let i = 0; i < CELLS_IN_COLUMN; i++) {
      animation[i] = new Array(CELLS_IN_ROW);
      for (let j = 0; j < CELLS_IN_ROW; j++) {
        animation[i][j] = new Animated.Value(value);
      }
    }
    return animation;
  };

  public static generateAnimatedValueXY = (
    // value: number,
    CELLS_IN_ROW = 8,
    CELLS_IN_COLUMN = 8,
  ) => {
    const animation = Array(CELLS_IN_COLUMN);
    for (let i = 0; i < CELLS_IN_COLUMN; i++) {
      animation[i] = new Array(CELLS_IN_ROW);
      for (let j = 0; j < CELLS_IN_ROW; j++) {
        animation[i][j] = new Animated.ValueXY();
      }
    }
    return animation;
  };
}
