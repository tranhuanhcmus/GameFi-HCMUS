export const fomulaForColumnOfFive = (numRows: number, numCols: number) => {
    return numCols * numRows - (numRows * 4) - 1;
}

export const fomulaForColumnOfFour = (numRows: number, numCols: number) => {
    return numCols * numRows - (numRows * 3) - 1;
}

export const fomulaForColumnOfThree = (numRows: number, numCols: number) => {
    return numCols * numRows - (numRows * 2) - 1;
}