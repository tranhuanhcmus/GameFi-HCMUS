import React, { useState, useEffect, useRef } from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import GemColors from '../lib/GemColors';
import ScoreBoard from './ScoreBoard';
import { 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  PanResponder, 
  Animated  
} from 'react-native';
import { 
  generateInvalidIndexes,
  moveIntoCellBelow
} from '../utils/moveCheckLogic';
import { 
  fomulaForColumnOfFive, 
  fomulaForColumnOfFour, 
  fomulaForColumnOfThree, 
} from '../utils/fomulas';

const generateRandomGrid = (numRows, numCols) => {
  const grid = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let randomColor;

      // Ensure the current color is different from the three adjacent cells
      do {
        randomColor = GemColors[Math.floor(Math.random() * GemColors.length)];
      } while (
        (i > 1 && grid[(i - 1) * numCols + j].color === randomColor && grid[(i - 2) * numCols + j].color === randomColor) ||
        (j > 1 && grid[i * numCols + (j - 1)].color === randomColor && grid[i * numCols + (j - 2)].color === randomColor)
      );

      const location = new Animated.ValueXY(); // Initialize Animated.ValueXY
      const scale = new Animated.Value(1); // Initialize Animated.Value
      grid.push({ color: randomColor, location, scale });
    }
  }

  return grid;
};

// let score = 0;

const GemGrid = () => {
  const window = Dimensions.get('window');
  const width = window.width * 0.8;
  const height = window.height * 0.8;
  const numRows = 8;
  const numCols = 8;
  // const size = numRows * numCols;
  const cellSize = Math.min(width / numCols, height / numRows);
  // const [selectedCell, setSelectedCell] = useState(null);
  // const [gesture, setGesture] = useState(new Animated.ValueXY());
  // const pan = useRef(new Animated.ValueXY()).current;
  const [grid, setGrid] = useState(generateRandomGrid(numRows, numCols));
  const [score, setScore] = useState(0);

  const isColumnOfFive = (
    numCols: number,  
    grid: Cell[], 
    fomulaForColumnOfFive: number
    ) => {
    for (let i = 0; i < fomulaForColumnOfFive; i++) {
      const columnOfFive = [
      i,
      i + numCols,
      i + numCols * 2,
      i + numCols * 3,
      i + numCols * 4
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if (columnOfFive.every(cell => grid[cell].color === decidedColor && !isBlank)) {
        columnOfFive.forEach(cell => grid[cell].color = '');
        setScore((score) => score + 5);
        return true;
      }
    }
  };

  const isColumnOfFour = (
    numCols: number,  
    grid: Cell[], 
    fomulaForColumnOfFour: number
    ) => {
    for (let i = 0; i < fomulaForColumnOfFour; i++) {
      const columnOfFour = [
      i,
      i + numCols,
      i + numCols * 2,
      i + numCols * 3
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if (columnOfFour.every(cell => grid[cell].color === decidedColor && !isBlank)) {
        columnOfFour.forEach(cell => grid[cell].color = '');
        setScore((score) => score + 4);
        return true;
      }
    }
  };

  const isColumnOfThree = (
    numCols: number,  
    grid: Cell[], 
    fomulaForColumnOfThree: number
    ) => {
    for (let i = 0; i < fomulaForColumnOfThree; i++) {
      const columnOfThree = [
      i,
      i + numCols,
      i + numCols * 2,
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if (columnOfThree.every(cell => grid[cell].color === decidedColor && !isBlank)) {
        columnOfThree.forEach(cell => grid[cell].color = '');
        setScore((score) => score + 3);
        return true;
      }
    }
  };

  const isRowOfFive = (
    numCols: number, 
    numRows: number,  
    grid: Cell[], 
    invalidIndexes: number[]
    ) => {
    for (let i = 0; i < numCols * numRows; i++) {
      const rowOfFive = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if(invalidIndexes.includes(i)) continue
      else {
        if (rowOfFive.every(cell => grid[cell].color === decidedColor && !isBlank)) {
          rowOfFive.forEach(cell => grid[cell].color = '');
          setScore((score) => score + 5);
          return true;
        }
      }
    }
  };

  const isRowOfFour = (
    numCols: number, 
    numRows: number,  
    grid: Cell[], 
    invalidIndexes: number[]
    ) => {
    for (let i = 0; i < numCols * numRows; i++) {
      const rowOfFour = [
      i,
      i + 1,
      i + 2,
      i + 3
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if(invalidIndexes.includes(i)) continue
      else {
        if (rowOfFour.every(cell => grid[cell].color === decidedColor && !isBlank)) {
          rowOfFour.forEach(cell => grid[cell].color = '');
          setScore((score) => score + 4);
          return true;
        }
      }
    }
  };

  const isRowOfThree = (
    numCols: number, 
    numRows: number,  
    grid: Cell[], 
    invalidIndexes: number[]
    ) => {
    for (let i = 0; i < numCols * numRows; i++) {
      const rowOfThree = [
      i,
      i + 1,
      i + 2
      ];

      const decidedColor = grid[i].color;
      const isBlank = grid[i].color === '';

      if(invalidIndexes.includes(i)) continue
      else {
        if (rowOfThree.every(cell => grid[cell].color === decidedColor && !isBlank)) {
          rowOfThree.forEach(cell => grid[cell].color = '');
          setScore((score) => score + 3);
          return true;
        }
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      isColumnOfFive(numCols, grid, fomulaForColumnOfFive(numRows, numCols));
      isRowOfFive(numCols, numRows, grid, generateInvalidIndexes(numCols, numRows, true, true));
      isColumnOfFour(numCols, grid, fomulaForColumnOfFour(numRows, numCols));
      isRowOfFour(numCols, numRows, grid, generateInvalidIndexes(numCols, numRows, true));
      isColumnOfThree(numCols, grid, fomulaForColumnOfThree(numRows, numCols));
      isRowOfThree(numCols, numRows, grid, generateInvalidIndexes(numCols, numRows));
      moveIntoCellBelow(numCols, numRows, grid, GemColors);
      setGrid([...grid]);
      // console.log(columnOfFive, columnOfFour, columnOfThree, rowOfFive, rowOfFour, rowOfThree);
    }, 100);
    return () => clearInterval(timeout);
    // console.log(grid[63])
    // const invalid = generateInvalidIndexes(numCols, numRows, true, true)
    // console.log(invalid);
  }, [numCols, numRows, grid, GemColors]);

  // console.log(score);

  onLayout = (event) => {
    this.gridOrigin = [event.nativeEvent.layout];
  }

  swap = (i, j, dx, dy) => {
    const swapStarterIndex =  Math.min(i * numCols + j - 1, numCols * numRows - 1);
    const swapEnderIndex =  Math.min((i + dx) * numCols + (j + dy) - 1, numCols * numRows - 1);
    console.log('start: ', swapStarterIndex, 'end: ', swapEnderIndex);
    
    const swapStarter = grid[swapStarterIndex];
    const swapEnder = grid[swapEnderIndex];

    // Swap grid items
    const updatedGrid = [...grid];
    updatedGrid[swapStarterIndex] = swapEnder;
    updatedGrid[swapEnderIndex] = swapStarter;

    const validMove = [
      swapStarterIndex - 1,
      swapStarterIndex - numCols,
      swapStarterIndex + 1,
      swapStarterIndex + numCols
    ]

    const isValidMove = validMove.includes(swapEnderIndex);

    const checkForColumnOfFive = isColumnOfFive(numCols, updatedGrid, fomulaForColumnOfFive(numRows, numCols));
    const checkForRowOfFive = isRowOfFive(numCols, numRows, updatedGrid, generateInvalidIndexes(numCols, numRows, true, true));
    const checkForColumnOfFour = isColumnOfFour(numCols, updatedGrid, fomulaForColumnOfFour(numRows, numCols));
    const checkForRowOfFour = isRowOfFour(numCols, numRows, updatedGrid, generateInvalidIndexes(numCols, numRows, true));
    const checkForColumnOfThree = isColumnOfThree(numCols, updatedGrid, fomulaForColumnOfThree(numRows, numCols));
    const checkForRowOfThree = isRowOfThree(numCols, numRows, updatedGrid, generateInvalidIndexes(numCols, numRows));
    
    if(isValidMove 
      && (checkForColumnOfFive || 
        checkForColumnOfFour || 
        checkForColumnOfThree || 
        checkForRowOfFive ||
        checkForRowOfFour ||
        checkForRowOfThree))
    {
      const animateSwap = Animated.parallel([
        Animated.timing(swapStarter.location, {
          toValue: { x: cellSize * (i + dx), y: cellSize * (j + dy) },
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(swapEnder.location, {
          toValue: { x: cellSize * i, y: cellSize * j },
          duration: 120,
          useNativeDriver: true,
        }),
      ]);

      setGrid(updatedGrid); // Update the state with the new grid    
    }
  }
  
  onSwipe = (gestureName, gestureState) => {
    // Swipe direction constants.
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    let initialGestureX = gestureState.x0;
    let initialGestureY = gestureState.y0;
    // console.log(initialGestureX, initialGestureY);
    // console.log(this.gridOrigin[0].y)
    // console.log(cellSize)
    // let lastGestureX = gestureState.moveX;
    // let lastGestureY = gestureState.moveY;
    // console.log(lastGestureX, lastGestureY);
    let col = Math.min(Math.max(0, Math.round((initialGestureX - 0.2 * cellSize) / cellSize)), numCols);
    let row = Math.min(Math.max(0, Math.round((initialGestureY - this.gridOrigin[0].y - 0.2 * cellSize) / cellSize)), numRows);

    console.log('col: ', col, 'row: ', row);

    switch (gestureName) {
      case SWIPE_UP:
        console.log('SU');
        swap(row, col, -1, 0);
        break;
      case SWIPE_DOWN:
        console.log('SD');
        swap(row, col, 1, 0);
        break;
      case SWIPE_LEFT:
        console.log('SL');
        swap(row, col, 0, -1);
        break;
      case SWIPE_RIGHT:
        console.log('SR');
        swap(row, col, 0, 1);
        break;
    }
  }

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onMoveShouldSetPanResponder: () => true,
  //   onPanResponderGrant: (_, gestureState) => { 
  //     console.log('Bắt đầu: ', gestureState);
  //     setGesture(new Animated.ValueXY());
  //   },
  //   onPanResponderMove: (_, gestureState) => {
  //     console.log('Di chuyển: ', gestureState);
  //     Animated.event(
  //       [null, { dx: gesture.x, dy: gesture.y }],
  //       { useNativeDriver: false }
  //     )(null, gestureState);

  //     // Xử lý sự kiện di chuyển (handleMove) nếu cần
  //   },
  //   onPanResponderRelease: (_, gestureState) => {
  //     console.log('Kết thúc: ', gestureState);
  //   },
  // });

  animateValuesToLocations = () => {
    grid.forEach((item, index) => {
      const i = Math.floor(index / numCols);
      const j = index % numCols;

      Animated.timing(item.location, {
        toValue: { x: cellSize * i, y: cellSize * j },
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }

  return (
    <>
      <Animated.View
        style={[
          styles.gridContainer,
          {
            width: cellSize * numCols,
            height: cellSize * numRows,
          },
        ]}
        onLayout={onLayout.bind(this)}
      >
        {grid.map((cell, index) => (
          <GestureRecognizer
            key={index}
            style={{ width: cellSize, height: cellSize }}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            // onTouchStart={()=>console.log('Drag: ', index)}
            // onTouchEnd={()=>console.log('Drop: ', index)}
            // onTouchEndCapture={()=>console.log('Drop: ', index)}

          >
            <Animated.Image
              style={{
                width: cellSize,
                height: cellSize,
                borderColor: 'pink',
                borderWidth: 3,
                borderRadius: 5,
                transform: [
                  { translateX: cell.location.x._value },
                  { translateY: cell.location.y._value },
                  { scale: cell.scale._value }
                ]
              }}
              // source={{ uri: cell.color }}
              source={cell.color}
            />
          </GestureRecognizer>
        ))}
      </Animated.View>
      <ScoreBoard score={score} />
    </>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cell: {
    // margin: 2,
  },
});

export default GemGrid;
