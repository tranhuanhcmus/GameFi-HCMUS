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

const UpperLayer = () => {
  const dispatch = useDispatch();
  const blockList = useSelector((state: any) => state.board.blockList);
  const blockState = store.getState().board;
  // const table = useRef<any[]>(blockState.table.map((row: any) => [...row]));
  const table = useSelector((state: any) => state.board.table);
  const [initialState, setInitialState] = useState({
    coordinate: GameLogic.generateAnimatedValueXY(),
  });

  const boardTable = useMemo(() => {
    return table.map((row: any) => [...row]);
  }, [table]);
  const cnt = useRef(0);

  useEffect(() => {
    cnt.current = blockList.length;
    startCollapseAnimation();
  }, [blockList]);

  /** Service: Generate columns to collapse */
  const generateCols = useMemo<(block: Block) => number[][]>(() => {
    return (block: Block) => {
      let startRow = 0;
      let endRow = Math.max(block.startCell.i, block.endCell.i); // Last index is exclusive
      let startCol = Math.min(block.startCell.j, block.endCell.j);
      let endCol = Math.max(block.startCell.j, block.endCell.j); // Last index is exclusive

      const cells = boardTable.slice(startRow, endRow);

      const cloneMatrix = [];
      for (let i = 0; i < cells.length; i++) {
        cloneMatrix.push(cells[i].slice(startCol, endCol + 2));
      }

      for (let i = startRow; i <= endRow; i++)
        for (let j = startCol; j <= endCol; j++) {
          boardTable[i][j] = GameLogic.randomNumber();
        }

      return cloneMatrix;
    };
  }, [blockList]);

  /**
   * ANIMATION FOR UPPER LAYER TO COLLAPSE
   */
  const startCollapseAnimation = () => {
    if (blockList !== null && blockList.length > 0) {
      blockList.forEach((block: any) => {
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        let cells: any[];

        const { blockHeight } = GameLogic.calculateCollapseCols(block);

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
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              // THIS RUN AFTER THE ANIMATION FINISHED
              cnt.current--;
              if (cnt.current == 0) {
                dispatch(updateTable(boardTable));
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
        // THIS WILL STORE THE VALUE OF CELL NEED TO DROP DOWN
        const cells = generateCols(block);

        const { top, left, blockWidth, blockHeight } =
          GameLogic.calculateCollapseCols(block);

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
                    top: top - 2 * blockHeight, // TODO HERE
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
                  {boardTable[indexRow][indexCol] == 0 ? (
                    <Text>0</Text>
                  ) : boardTable[indexRow][indexCol] == 1 ? (
                    <Text>1</Text>
                  ) : boardTable[indexRow][indexCol] == 2 ? (
                    <Text>2</Text>
                  ) : boardTable[indexRow][indexCol] == 3 ? (
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
  }, [blockList]);
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
