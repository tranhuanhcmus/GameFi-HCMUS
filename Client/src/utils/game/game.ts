/** LOGIC TO CHECK IF A COLUMN OR ROW IS THE SAME ELEMENT */
const isColumnOfFive = (
  numCols: number,
  grid: any[],
  fomulaForColumnOfFive: number,
) => {
  for (let i = 0; i < fomulaForColumnOfFive; i++) {
    const columnOfFive = [
      i,
      i + numCols,
      i + numCols * 2,
      i + numCols * 3,
      i + numCols * 4,
    ];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (
      columnOfFive.every(
        (cell) => grid[cell].color === decidedColor && !isBlank,
      )
    ) {
      columnOfFive.forEach((cell) => (grid[cell].color = ""));
      // setScore((score) => score + 5);
      return true;
    }
  }
};

const isColumnOfFour = (
  numCols: number,
  grid: any[],
  fomulaForColumnOfFour: number,
) => {
  for (let i = 0; i < fomulaForColumnOfFour; i++) {
    const columnOfFour = [i, i + numCols, i + numCols * 2, i + numCols * 3];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (
      columnOfFour.every(
        (cell) => grid[cell].color === decidedColor && !isBlank,
      )
    ) {
      columnOfFour.forEach((cell) => (grid[cell].color = ""));
      // setScore((score) => score + 4);
      return true;
    }
  }
};

const isColumnOfThree = (
  numCols: number,
  grid: any[],
  fomulaForColumnOfThree: number,
) => {
  for (let i = 0; i < fomulaForColumnOfThree; i++) {
    const columnOfThree = [i, i + numCols, i + numCols * 2];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (
      columnOfThree.every(
        (cell) => grid[cell].color === decidedColor && !isBlank,
      )
    ) {
      columnOfThree.forEach((cell) => (grid[cell].color = ""));
      // setScore((score) => score + 3);
      return true;
    }
  }
};

const isRowOfFive = (
  numCols: number,
  numRows: number,
  grid: any[],
  invalidIndexes: number[],
) => {
  for (let i = 0; i < numCols * numRows; i++) {
    const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (invalidIndexes.includes(i)) continue;
    else {
      if (
        rowOfFive.every((cell) => grid[cell].color === decidedColor && !isBlank)
      ) {
        rowOfFive.forEach((cell) => (grid[cell].color = ""));
        // setScore((score) => score + 5);
        return true;
      }
    }
  }
};

const isRowOfFour = (
  numCols: number,
  numRows: number,
  grid: any[],
  invalidIndexes: number[],
) => {
  for (let i = 0; i < numCols * numRows; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (invalidIndexes.includes(i)) continue;
    else {
      if (
        rowOfFour.every((cell) => grid[cell].color === decidedColor && !isBlank)
      ) {
        rowOfFour.forEach((cell) => (grid[cell].color = ""));
        // setScore((score) => score + 4);
        return true;
      }
    }
  }
};

const isRowOfThree = (
  numCols: number,
  numRows: number,
  grid: any[],
  invalidIndexes: number[],
) => {
  for (let i = 0; i < numCols * numRows; i++) {
    const rowOfThree = [i, i + 1, i + 2];

    const decidedColor = grid[i].color;
    const isBlank = grid[i].color === "";

    if (invalidIndexes.includes(i)) continue;
    else {
      if (
        rowOfThree.every(
          (cell) => grid[cell].color === decidedColor && !isBlank,
        )
      ) {
        rowOfThree.forEach((cell) => (grid[cell].color = ""));
        // setScore((score) => score + 3);
        return true;
      }
    }
  }
};
