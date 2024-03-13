import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Animated,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { emptyBlockList, updateTable } from "../../redux/boardSlice";
import GameLogic from "../../utils/game/game";

const generateAnimatedValueXY = (CELLS_IN_ROW = 8, CELLS_IN_COLUMN = 8) => {
  // if (!matrix) return [];

  const animation = Array(CELLS_IN_COLUMN);
  for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    animation[i] = new Array(CELLS_IN_ROW);
    for (let j = 0; j < CELLS_IN_ROW; j++) {
      animation[i][j] = new Animated.ValueXY();
    }
  }
  return animation;
};

const UpperLayer = () => {
  const dispatch = useDispatch();
  const blockList = useSelector((state: any) => state.board.blockList);
  const blockState = store.getState().board;
  const table = useRef<any[]>(blockState.table.map((row: any) => [...row]));
  const [initialState, setInitialState] = useState({
    coordinate: generateAnimatedValueXY(),
  });

  const cnt = useRef(0);

  useEffect(() => {
    console.log("Upper layer ", blockList);

    cnt.current = blockList.length;
    startAnimation();
  }, [blockList]);

  /** Service: Generate columns to collapse */
  const generateCols = useMemo<(block: Block) => number[][]>(() => {
    return (block: Block) => {
      let startRow = 0;
      let endRow = Math.max(block.startCell.i, block.endCell.i); // Last index is exclusive
      let startCol = Math.min(block.startCell.j, block.endCell.j);
      let endCol = Math.max(block.startCell.j, block.endCell.j); // Last index is exclusive

      const cells = table.current.slice(startRow, endRow);

      const cloneMatrix = [];
      for (let i = 0; i < cells.length; i++) {
        cloneMatrix.push(cells[i].slice(startCol, endCol + 2));
      }

      for (let i = startRow; i <= endRow; i++)
        for (let j = startCol; j <= endCol; j++) {
          table.current[i][j] = GameLogic.randomNumber();
        }

      return cloneMatrix;
    };
  }, [blockList]);

  /**
   * Generate new table;
   */
  const generateTable = () => {
    console.log("table when generate random collapse ");
    GameLogic.printTable(table.current);
  };
  /**
   * ANIMATION FOR UPPER LAYER TO COLLAPSE
   */
  const startAnimation = () => {
    if (blockList !== null && blockList.length > 0) {
      blockList.forEach((block: any) => {
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        let cells: any[] = generateCols(block);

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
            blockState.size.CELL_SPACING +
            block.startCell.j *
              (blockState.size.WIDTH_PER_CELL + blockState.size.CELL_SPACING),
          y:
            blockState.size.CELL_SPACING +
            block.startCell.i *
              (blockState.size.HEIGHT_PER_CELL + blockState.size.CELL_SPACING),
        };

        // CALCULATE THE POSITION OF END CELL IN BLOCK
        const endCellPos = {
          x:
            blockState.size.CELL_SPACING +
            block.endCell.j *
              (blockState.size.WIDTH_PER_CELL + blockState.size.CELL_SPACING) +
            blockState.size.WIDTH_PER_CELL,
          y:
            blockState.size.CELL_SPACING +
            block.endCell.i *
              (blockState.size.HEIGHT_PER_CELL + blockState.size.CELL_SPACING) +
            blockState.size.HEIGHT_PER_CELL,
        };

        // CALCULATE THE POSITION OF START OF BLOCK
        const startBlockPos = {
          x: Math.min(startCellPos.x, endCellPos.x),
          y: blockState.size.CELL_SPACING,
        };

        // CALCULATE THE POSITION OF END OF BLOCK
        const endBlockPos = endCellPos;

        // CALCULATE THE TOP POSITION OF BLOCK
        const top = blockState.position.top;

        // CALCULATE THE LEFt POSITION OF BLOCK
        const left =
          blockState.position.left +
          start.j *
            (blockState.size.WIDTH_PER_CELL + 2 * blockState.size.CELL_SPACING);

        // CALCULATE THE WIDTH OF BLOCK
        const blockWidth =
          Math.abs(start.j - end.j + 1) *
          (blockState.size.WIDTH_PER_CELL + 2 * blockState.size.CELL_SPACING);

        // CALCULATE THE HEIGHT OF WIDTH
        const blockHeight =
          countEmptyTop *
          (blockState.size.HEIGHT_PER_CELL + 2 * blockState.size.CELL_SPACING);

        console.log("top  ", top);

        console.log("left ", left);

        console.log("blockWidth ", blockWidth);

        console.log("blockHeight ", blockHeight);

        console.log("===============================================");

        const startCell = block.startCell;
        const endCell = block.endCell;

        cells = [];
        if (startCell.i == endCell.i) {
          // IN A ROW
          for (let cnt = startCell.j; cnt <= endCell.j; cnt++)
            cells.push({ row: startCell.i, col: cnt });
        } else {
          // IN A COLUMN
          for (let cnt = startCell.i; cnt <= endCell.i; cnt++)
            cells.push({ row: cnt, col: startCell.j });
        }

        for (let i = 0; i < initialState.coordinate.length; i++) {
          for (let j = 0; j < initialState.coordinate[0].length; j++) {
            Animated.timing(initialState.coordinate[i][j], {
              toValue: { x: 0, y: blockHeight }, // PROBLEM HERE!!!!
              duration: 2000,
              useNativeDriver: true,
            }).start(() => {
              // THIS RUN AFTER THE ANIMATION FINISHED
              cnt.current--;
              if (cnt.current == 0) {
                dispatch(updateTable(table.current));
                dispatch(emptyBlockList([]));
              }
            });
          }
        }
      });
    }
  };

  return useMemo(() => {
    return blockList === null || blockList.length === 0 ? (
      <></>
    ) : (
      blockList.map((block: any, indexBlock: any) => {
        console.log("block ", block);

        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        const cells = generateCols(block);

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
            blockState.size.CELL_SPACING +
            block.startCell.j *
              (blockState.size.WIDTH_PER_CELL + blockState.size.CELL_SPACING),
          y:
            blockState.size.CELL_SPACING +
            block.startCell.i *
              (blockState.size.HEIGHT_PER_CELL + blockState.size.CELL_SPACING),
        };

        // CALCULATE THE POSITION OF END CELL IN BLOCK
        const endCellPos = {
          x:
            blockState.size.CELL_SPACING +
            block.endCell.j *
              (blockState.size.WIDTH_PER_CELL + blockState.size.CELL_SPACING) +
            blockState.size.WIDTH_PER_CELL,
          y:
            blockState.size.CELL_SPACING +
            block.endCell.i *
              (blockState.size.HEIGHT_PER_CELL + blockState.size.CELL_SPACING) +
            blockState.size.HEIGHT_PER_CELL,
        };

        // CALCULATE THE POSITION OF START OF BLOCK
        const startBlockPos = {
          x: Math.min(startCellPos.x, endCellPos.x),
          y: blockState.size.CELL_SPACING,
        };

        // CALCULATE THE POSITION OF END OF BLOCK
        const endBlockPos = endCellPos;

        // CALCULATE THE TOP POSITION OF BLOCK
        const top = blockState.position.top;

        // CALCULATE THE LEFt POSITION OF BLOCK
        const left =
          blockState.position.left +
          start.j *
            (blockState.size.WIDTH_PER_CELL + 2 * blockState.size.CELL_SPACING);

        // CALCULATE THE WIDTH OF BLOCK
        const blockWidth =
          Math.abs(start.j - end.j + 1) *
          (blockState.size.WIDTH_PER_CELL + 2 * blockState.size.CELL_SPACING);

        // CALCULATE THE HEIGHT OF WIDTH
        const blockHeight =
          countEmptyTop *
          (blockState.size.HEIGHT_PER_CELL + 2 * blockState.size.CELL_SPACING);

        console.log("top  ", top);

        console.log("left ", left);

        console.log("blockWidth ", blockWidth);

        console.log("blockHeight ", blockHeight);

        console.log("===============================================");

        return (
          <View
            key={indexBlock}
            style={{
              position: "absolute",
              zIndex: 5,
              top: top,
              left: left,
              height: blockHeight,
              width: blockWidth,
              overflow: "hidden",
              backgroundColor: COLOR.WHITE,
              borderColor: COLOR.PURPLE,
            }}
          >
            {/* cells in block here */}
            {cells.map((row, indexRow) =>
              row.map((cell, indexCol) => (
                <Animated.View
                  key={indexCol}
                  style={{
                    top: top - blockHeight, // TODO HERE
                    margin: blockState.size.CELL_SPACING,
                    height: blockState.size.HEIGHT_PER_CELL,
                    width: blockState.size.WIDTH_PER_CELL,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    zIndex: 99,
                    backgroundColor: COLOR.RED,
                    borderRadius: 5,

                    transform: [
                      {
                        translateX:
                          initialState.coordinate[indexRow][indexCol].x,
                      },
                      {
                        translateY:
                          initialState.coordinate[indexRow][indexCol].y,
                      },
                    ],
                  }}
                >
                  {table.current[indexRow][indexCol] == 0 ? (
                    <Text>0</Text>
                  ) : table.current[indexRow][indexCol] == 1 ? (
                    <Text>1</Text>
                  ) : table.current[indexRow][indexCol] == 2 ? (
                    <Text>2</Text>
                  ) : table.current[indexRow][indexCol] == 3 ? (
                    <Text>3</Text>
                  ) : (
                    <Text>4</Text>
                  )}
                </Animated.View>
              )),
            )}
          </View>
        );
      })
    );
  }, [blockList, blockState.table]);
};
const styles = StyleSheet.create({
  boardContainer: {
    height: GameLogic.SIZE_TABLE,
    width: GameLogic.SIZE_TABLE,
    backgroundColor: COLOR.WHITE,
    alignContent: "center",
  },
});

export default UpperLayer;
