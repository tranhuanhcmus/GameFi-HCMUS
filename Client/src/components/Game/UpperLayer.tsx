import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { Animated, View, Text } from "react-native";
import { store } from "../../redux/store";
import { COLOR } from "../../utils/color";
// import {
//   WordSearchCellEffect,
//   WordSearchMissionStatus,
// } from "~models/word-search";
// import { WordSearchContext } from "~provider/WordSearchProvider";
// import {
//   INITIAL_UPPER_LAYER_STATE,
//   upperLayerReducer,
// } from "~reducer/wordsearch/wordsearch";
// import { getPseudoRandoms } from "~utils";
// import WordSearchBoardCell from "./BoardCell";

const UpperLayer = React.memo(
  ({
    CELLS_IN_COLUMN,
    CELLS_IN_ROW,
    callbackFunction,
    blockList,
    cells,
    blockLists,
    matrix, // array vs 0 và 1. 1 is empty, 0 is a block
  }: {
    CELLS_IN_COLUMN: number;
    CELLS_IN_ROW: number;
    blockLists: {
      startCell: { i: number; j: number };
      endCell: { i: number; j: number };
    }[][];
    [key: string]: any;
  }) => {
    // TODO WILL DELETE LATER
    blockList = [
      {
        startCell: { i: 0, j: 0 },
        endCell: { i: 1, j: 1 },
      },
    ];
    /**
     * THIS FUNCTION TO CLONE MATRIX
     * @param matrix
     * @returns
     */
    const cloneMatrix: any = (matrix: any[][]) => {
      return matrix.map((row) => [...row]);
    };

    const randLetter = () => {
      const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
      ];
      const letter = letters[Math.floor(Math.random() * letters.length)];
      return letter;
    };
    // const { blockState } = useContext(WordSearchContext);
    const blockState = store.getState().board;
    const state = store.getState().upperLayer;
    // const [state, dispatch] = useReducer(
    //   upperLayerReducer,
    //   INITIAL_UPPER_LAYER_STATE,
    // );

    const collapseCols = useMemo(() => {
      // const triggerCols = new Array(matrix[0].length).fill(0);
      // blockLists.forEach((blockList) => {
      //   blockList.forEach((block) => {
      //     for (let i = block.startCell.j; i <= block.endCell.j; i++) {
      //       triggerCols[i]++;
      //     }
      //   });
      // });
      // return triggerCols;
      // return blockState.board.upperLayer?.getCollapseCols(blockLists);
    }, [blockLists]);

    // TODO Mao phac
    // useEffect(() => {
    //   if (blockList === null || blockList.length === 0) return;

    //   // const effectsProbability =
    //   //   blockState.board.getEffectsProbabilityBySymbolAndValue();

    //   // const effectsMap = blockState.board.getEffectsProbabilityBySymbolAndKey();

    //   // const stateList = blockState.board.upperLayer?.getStateList(blockList);

    //   const copyMatrix = cloneMatrix(matrix);
    //   const copyCells = cloneMatrix(cells);

    //   // blockList.forEach((block: any) => {
    //   //   const distance = block.endCell.i - block.startCell.i + 1;

    //   //   // TODO IMPORTANT UNCOMMENT THIS LATER
    //   //   // for (let j = block.startCell.j; j <= block.endCell.j; j++) {
    //   //   //   // Move cells down by the block's distance
    //   //   //   for (let k = block.endCell.i; k >= distance; k--) {
    //   //   //     if (copyMatrix[k][j] === 2) continue;
    //   //   //     if (copyMatrix[k - distance][j] === 2) {
    //   //   //       // copyMatrix[k][j] = 0;
    //   //   //     } else {
    //   //   //       copyMatrix[k][j] = copyMatrix[k - distance][j];
    //   //   //       copyCells[k][j] = copyCells[k - distance][j];
    //   //   //     }
    //   //   //   }

    //   //   //   // // Fill the top cells with zeros to complete the block's movement
    //   //   //   for (let k = 0; k < distance; k++) {
    //   //   //     if (copyMatrix[k][j] === 2) continue;
    //   //   //     copyMatrix[k][j] = 1;
    //   //   //   }
    //   //   // }
    //   // });
    //   console.log("debug cho nay ne");
    //   // const board = copyCells.map((row: any, i: number) => {
    //   //   return row.map((item: any, j: number) => {
    //   //     // if (item.effect === WordSearchCellEffect.gift) {
    //   //     //   return blockState.board.probabilityEffects?.[item.effect]?.symbol;
    //   //     // }
    //   //     return copyMatrix[i][j] === 1 ? "*" : item.letter;
    //   //   });
    //   // });

    //   // const wordList: string[] = Object.keys(blockState.words).sort(
    //   //   (word1, word2) => {
    //   //     const a = blockState.missions.find(
    //   //       (mission: any) => mission.word === word1,
    //   //     );
    //   //     const b = blockState.missions.find(
    //   //       (mission: any) => mission.word === word2,
    //   //     );

    //   //     const aData = a?.status === WordSearchMissionStatus.PENDING ? 0 : 1;
    //   //     const bData = b?.status === WordSearchMissionStatus.PENDING ? 0 : 1;

    //   //     return aData - bData || (a?.count || 0) - (b?.count || 0);
    //   //   },
    //   // );

    //   const positionsToFillTable: any[] = [];
    //   // for (let j = 0; j <= copyCells[0].length; j++) {
    //   //   for (let i = 0; i < copyCells.length; i++) {
    //   //     if (board[i][j] === " ") continue;
    //   //     if (board[i][j] === "*") {
    //   //       while (j + 1 < copyCells[0].length && board[i][j + 1] === "*") {
    //   //         j++;
    //   //       }

    //   //       // const positions = blockState.board.fillTableWithWords(
    //   //       //   board,
    //   //       //   collapseCols,
    //   //       //   wordList,
    //   //       // );

    //   //       // positionsToFillTable.push(
    //   //       //   ...positions.filter(
    //   //       //     (position) =>
    //   //       //       positionsToFillTable.length === 0 ||
    //   //       //       positionsToFillTable.some(
    //   //       //         (position2) =>
    //   //       //           position.j !== position2.j || position.i !== position2.i,
    //   //       //       ),
    //   //       //   ),
    //   //       // );
    //   //       break;
    //   //     } else {
    //   //       break;
    //   //     }
    //   //   }
    //   // }

    //   // const blocksValues = blockList.map((block: any) => {
    //   //   const height = Math.abs(block.startCell.i - block.endCell.i) + 1;
    //   //   const width = Math.abs(block.startCell.j - block.endCell.j) + 1;

    //   //   const blocks = [];
    //   //   const collapseMatrix = [];

    //   //   // generate hidden blocks
    //   //   for (let i = 0; i < height; i++) {
    //   //     const row = [];
    //   //     const rowCollapse = [];

    //   //     for (let j = 0; j < width; j++) {
    //   //       rowCollapse.push(0);
    //   //       const position = positionsToFillTable?.find(
    //   //         (item) =>
    //   //           item.i === i + block.startCell.i &&
    //   //           item.j === j + block.startCell.j,
    //   //       );

    //   //       if (position) {
    //   //         row.push({
    //   //           letter: position.letter,
    //   //           // effect: WordSearchCellEffect.normal,
    //   //         });
    //   //         continue;
    //   //       }

    //   //       // const effect = getPseudoRandoms(
    //   //       //   effectsProbability,
    //   //       //   1,
    //   //       // )[0] as WordSearchCellEffect;

    //   //       const cell = {
    //   //         letter: randLetter(),
    //   //         // effect: effectsMap[effect],
    //   //       };
    //   //       row.push(cell);
    //   //     }
    //   //     blocks.push(row);
    //   //     collapseMatrix.push(rowCollapse);
    //   //   }

    //   //   // add existing blocks
    //   //   for (let i = 0; i < CELLS_IN_COLUMN; i++) {
    //   //     const row = [];
    //   //     const rowCollapse = [];

    //   //     for (let j = 0; j < CELLS_IN_ROW; j++) {
    //   //       if (
    //   //         j >= block.startCell.j &&
    //   //         j <= block.endCell.j &&
    //   //         i < block.startCell.i &&
    //   //         cells[i][j].letter !== " "
    //   //       ) {
    //   //         row.push(cells[i][j]);

    //   //         rowCollapse.push(matrix[i][j] === 1 ? 1 : 0);
    //   //       }
    //   //     }
    //   //     if (row.length > 0) blocks.push(row);
    //   //     if (rowCollapse.length > 0) collapseMatrix.push(rowCollapse);
    //   //   }

    //   //   return { blocks, collapseMatrix };
    //   // });
    // }, [blockList, collapseCols]);

    // const startAnimation = () => {
    //   if (state.stateList.length === 0) return;

    //   Animated.parallel(
    //     state.stateList.map((item: any) => {
    //       return Animated.spring(item.animation, {
    //         toValue: 0,
    //         speed: 30,
    //         useNativeDriver: true, // Add This line
    //       });
    //     }),
    //   ).start(() => {
    //     callbackFunction(state.blocksValues);
    //   });
    // };

    // useEffect(() => {
    //   if (blockList !== null && blockList.length > 0) startAnimation();
    // }, [state.stateList]);

    // LOG OUT INFOMATION
    useEffect(() => {
      blockList = [
        {
          startCell: { i: 0, j: 0 },
          endCell: { i: 1, j: 1 },
        },
      ];
      console.log("Log blocklist ", blockList);
      console.log("blockList === null  ", blockList === null);
    }, []);

    return useMemo(
      () =>
        blockList === null || blockList.length === 0 ? (
          <></>
        ) : (
          // state.stateList.length !== 0 && TODO UNCOMMENT LATER
          // state.blocksValues.length !== 0 && TODO UNCOMMENT LATER
          // blockList.map((block: any, indexBlock: any) => {
          //   const start = block.startCell;
          //   const end = block.endCell;
          //   let countEmptyTop = 0;

          //   // for (let k = 0; k <= end.i; k++) {
          //   //   for (let h = start.j; h <= end.j; h++) {
          //   //     if (cells[k][h].letter === " ") {
          //   //       countEmptyTop++;
          //   //       continue;
          //   //     }
          //   //   }
          //   // }

          //   const startCellPos = {
          //     x: +block.startCell.j * blockState.size.WIDTH_PER_CELL,
          //     y: +block.startCell.i * blockState.size.WIDTH_PER_CELL,
          //   };

          //   const endCellPos = {
          //     x:
          //       +block.endCell.j * blockState.size.WIDTH_PER_CELL +
          //       blockState.size.WIDTH_PER_CELL,
          //     y:
          //       +block.endCell.i * blockState.size.WIDTH_PER_CELL +
          //       blockState.size.WIDTH_PER_CELL,
          //   };

          //   const startBlockPos = {
          //     x: Math.min(startCellPos.x, endCellPos.x),
          //     y: blockState.size.WIDTH_PER_CELL,
          //   };

          //   const endBlockPos = endCellPos;

          //   const top =
          //     Math.min(startBlockPos.y, endBlockPos.y) +
          //     countEmptyTop * blockState.size.WIDTH_PER_CELL;
          //   const left = Math.min(startBlockPos.x, endBlockPos.x);

          //   const blockWidth = Math.abs(startBlockPos.x - endBlockPos.x);
          //   const blockHeight = Math.abs(startBlockPos.y - endBlockPos.y);

          //   // const animatedStyle = {
          //   //   transform: [
          //   //     { translateY: state.stateList[indexBlock].animation },
          //   //   ],
          //   // };
          //   // const temp = state.blocksValues[indexBlock];
          //   // const blockCells = temp.blocks;
          //   const blockCells: any[] = [];
          //   const collapseMatrix: any[] = [];
          //   // const collapseMatrix = temp.collapseMatrix;

          //   // TODO UNCOMMENT LATER
          //   // return (
          //   //   <View
          //   //     key={indexBlock}
          //   //     style={{
          //   //       position: "absolute",
          //   //       // zIndex: 2,
          //   //       // top: top,
          //   //       // left: left,
          //   //       // height: blockHeight + 4,
          //   //       // width: blockWidth + 2.9,
          //   //       width: 500,
          //   //       height: 500,
          //   //       overflow: "hidden",
          //   //       backgroundColor: COLOR.BLUE,
          //   //     }}
          //   //   >
          //   //     <Animated.View
          //   //       style={[
          //   //         {
          //   //           height: blockHeight + 4,
          //   //           width: blockWidth + 2.9,
          //   //           flexDirection: "row",
          //   //           flexWrap: "wrap",
          //   //           zIndex: 2,
          //   //         },
          //   //         // animatedStyle,
          //   //       ]}
          //   //     >
          //   //       <View style={{ position: "relative" }}>
          //   //         <View>
          //   //           <Text style={{ fontSize: 20, color: COLOR.WHITE }}>
          //   //             Alooo
          //   //           </Text>
          //   //         </View>
          //   //         {/* <BgDecoration />  TODO Uncomment this later and fix this*/}
          //   //         {blockCells.map((cellRow: any, index: number) =>
          //   //           cellRow.map((cell: any, index2: number) => {
          //   //             const key = index + "-" + index2;
          //   //             return (
          //   //               <View
          //   //                 key={key}
          //   //                 // cell={cell}
          //   //                 style={{
          //   //                   top:
          //   //                     blockState.size.CELL_SPACING +
          //   //                     index *
          //   //                       (blockState.size.WIDTH_PER_CELL +
          //   //                         blockState.size.CELL_SPACING),
          //   //                   left:
          //   //                     blockState.size.CELL_SPACING +
          //   //                     index2 *
          //   //                       (blockState.size.HEIGHT_PER_CELL +
          //   //                         blockState.size.CELL_SPACING),
          //   //                   width: blockState.size.WIDTH_PER_CELL,
          //   //                   height: blockState.size.HEIGHT_PER_CELL,
          //   //                   opacity:
          //   //                     collapseMatrix[index][index2] === 1 ? 0 : 1,
          //   //                   // backgroundColor:
          //   //                   //   state.backgroundColor[index][index2],
          //   //                   borderColor: COLOR.BLUE,
          //   //                   borderWidth: 2,
          //   //                   borderRadius: 5,
          //   //                   zIndex: 3,
          //   //                   justifyContent: "center",
          //   //                   alignItems: "center",
          //   //                   marginTop: -5,
          //   //                   marginLeft: -5,
          //   //                 }}
          //   //               />
          //   //             );
          //   //           }),
          //   //         )}
          //   //       </View>
          //   //     </Animated.View>
          //   //   </View>
          //   // );

          // })

          <View
            // key={indexBlock}
            style={{
              position: "absolute",
              // zIndex: 2,
              // top: top,
              // left: left,
              // height: blockHeight + 4,
              // width: blockWidth + 2.9,
              width: 500,
              height: 500,
              overflow: "hidden",
              backgroundColor: COLOR.BLUE,
            }}
          >
            <Animated.View
              style={[
                {
                  // height: blockHeight + 4,
                  // width: blockWidth + 2.9,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  zIndex: 2,
                },
                // animatedStyle,
              ]}
            >
              <View style={{ position: "relative" }}>
                <View
                  // cell={cell}
                  style={{
                    width: blockState.size.WIDTH_PER_CELL,
                    height: blockState.size.HEIGHT_PER_CELL,

                    // backgroundColor:
                    //   state.backgroundColor[index][index2],
                    borderColor: COLOR.BLUE,
                    borderWidth: 2,
                    borderRadius: 5,
                    zIndex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -5,
                    marginLeft: -5,
                  }}
                />
              </View>
            </Animated.View>
          </View>
        ),
      [state.blockList, state.stateList],
    );
  },
);

export default UpperLayer;
