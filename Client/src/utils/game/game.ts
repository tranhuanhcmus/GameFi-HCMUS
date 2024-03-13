import { Animated } from "react-native";
export default interface AnimationPropertyType {
  [key: string]: string;
}

export interface AnimatedValues {
  [key: string]: any[][];
}
export default class GameLogic {
  /**
   * Size in pixel of table, please change if needed.
   */
  public static SIZE_TABLE = 280;

  public static CELL_SPACING = 3;

  public static MARGIN = 3;

  public static CELLS_IN_ROW = 8;

  public static CELLS_IN_COLUMN = 8;

  public static WIDTH_PER_CELL = this.SIZE_TABLE / 8;

  public static HEIGHT_PER_CELL = this.SIZE_TABLE / 8;

  public static POSITION_TOP = 100;

  public static POSITION_LEFT = 15;

  /** Animation Property */
  public static AnimationProperty: AnimationPropertyType = {
    BACKGROUNDCOLOR: "backgroundColor",
    Z_INDEX: "zIndex",
    ROTATION: "rotation",
    SCALE: "scale",
    SCORE_OPACITY: "scoreOpacity",
  };

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

  /**
   * Function to generate 2D Matrix Animated.ValueXY
   * @param value
   * @param CELLS_IN_ROW
   * @param CELLS_IN_COLUMN
   * @returns
   */
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

  /** THIS HELP TO CALCULATE THE DISTANCE TO SWAP 2 CELLS */
  public static calculateDistanceToSwap = (
    row: any,
    col: any,
    numCellX: number,
    numCellY: number,
  ) => {
    const MARGIN = 3;
    const WIDTH_PER_CELL = this.SIZE_TABLE / 8;

    /** This code prevent exceed finger cross more than 1 cell on table */
    numCellX > 0
      ? (numCellX = 1)
      : numCellX < 0
        ? (numCellX = -1)
        : (numCellX = 0);

    numCellY > 0
      ? (numCellY = 1)
      : numCellY < 0
        ? (numCellY = -1)
        : (numCellY = 0);

    // EXTRA MARGIN ON CELL ON X_AXIS
    const MARGIN_X = numCellX > 0 ? MARGIN : numCellX < 0 ? -MARGIN : 0;

    // EXTRA MARGIN ON CELL ON Y_AXIS
    const MARGIN_Y = numCellY > 0 ? MARGIN : numCellY < 0 ? -MARGIN : 0;

    return {
      horizontalDistance: numCellX * WIDTH_PER_CELL + MARGIN_X * 2,
      verticalDistance: numCellY * WIDTH_PER_CELL + MARGIN_Y * 2,
    };
  };

  /** THIS FUNCTION HELP TO caculate the position of collapse cols. */
  public static calculateCollapseCols = (block: any) => {
    console.log("block ", block);

    const start = block.startCell;
    const end = block.endCell;

    // COUNT THE EMPTY ABOVE TO CALCULATE THE WIDTH AND HEIGHT OF BLOCK
    let countEmptyTop = 0;

    for (let k = 0; k <= end.i; k++) {
      for (let h = start.j; h <= end.j; h++) {
        countEmptyTop++;
      }
    }

    // CALCULATE THE POSITION OF START CELL IN BLOCK
    const startCellPos = {
      x:
        this.CELL_SPACING +
        block.startCell.j * (this.WIDTH_PER_CELL + this.CELL_SPACING),
      y:
        this.CELL_SPACING +
        block.startCell.i * (this.HEIGHT_PER_CELL + this.CELL_SPACING),
    };

    // CALCULATE THE POSITION OF END CELL IN BLOCK
    const endCellPos = {
      x:
        this.CELL_SPACING +
        block.endCell.j * (this.WIDTH_PER_CELL + this.CELL_SPACING) +
        this.WIDTH_PER_CELL,
      y:
        this.CELL_SPACING +
        block.endCell.i * (this.HEIGHT_PER_CELL + this.CELL_SPACING) +
        this.HEIGHT_PER_CELL,
    };

    // CALCULATE THE POSITION OF START OF BLOCK
    const startBlockPos = {
      x: Math.min(startCellPos.x, endCellPos.x),
      y: GameLogic.CELL_SPACING,
    };

    // CALCULATE THE POSITION OF END OF BLOCK
    const endBlockPos = endCellPos;

    // CALCULATE THE TOP POSITION OF BLOCK
    const top = this.POSITION_TOP;

    // CALCULATE THE LEFt POSITION OF BLOCK
    const left =
      this.POSITION_LEFT +
      start.j * (this.WIDTH_PER_CELL + 2 * this.CELL_SPACING);

    // CALCULATE THE WIDTH OF BLOCK
    const blockWidth =
      Math.abs(start.j - end.j + 1) *
      (this.WIDTH_PER_CELL + 2 * this.CELL_SPACING);

    // CALCULATE THE HEIGHT OF WIDTH
    const blockHeight =
      countEmptyTop * (this.HEIGHT_PER_CELL + 2 * this.CELL_SPACING);

    return {
      top: top,
      left: left,
      blockWidth: blockWidth,
      blockHeight: blockHeight,
    };
  };
}
