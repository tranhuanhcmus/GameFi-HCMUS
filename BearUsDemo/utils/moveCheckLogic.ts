interface Cell {
  color: string;
}

export const isColumnOfFive = (
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
            return { isMatch: true, score: 5 };
        }
    }
    return { isMatch: false, score: 0 };
};

export const isColumnOfFour = (
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
            return { isMatch: true, score: 4 };
        }
    }
    return { isMatch: false, score: 0 };
};

export const isColumnOfThree = (
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
            return { isMatch: true, score: 3 };
        }
    }
    return { isMatch: false, score: 0 };
};

export const generateInvalidIndexes = (
    numCols: number, 
    numRows: number, 
    isFour: boolean = false, 
    isFive: boolean = false
    ) => {
    const invalidIndexes: Array<number> = [];
    for (let i = numCols; i <= numCols * numRows; i += numCols) {
        if(isFive) invalidIndexes.push(i - 4);
        if(isFour) invalidIndexes.push(i - 3);
        invalidIndexes.push(i - 2);
        invalidIndexes.push(i - 1);
        // console.log(i);
    }
    return invalidIndexes;
};

export const isRowOfFive = (
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
                return { isMatch: true, score: 5 };
            }
        }
    }
    return { isMatch: false, score: 0 };
};

export const isRowOfFour = (
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
                return { isMatch: true, score: 4 };
            }
        }
    }
    return { isMatch: false, score: 0 };
};

export const isRowOfThree = (
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
                return { isMatch: true, score: 3 };
            }
        }
    }
    return { isMatch: false, score: 0 };
};

export const moveIntoCellBelow = (
    numCols: number, 
    numRows: number,  
    grid: Cell[],
    GemColors: string[]) => {
    for (let i = 0; i < numCols * numRows - numCols; i++) {
        if(i < numCols && grid[i].color === '') // check if the current index is in the first row
        {
            let randomColor = GemColors[Math.floor(Math.random() * GemColors.length)];
            grid[i].color = randomColor;
        }

        if(grid[i + numCols].color === '') {
            grid[i + numCols].color = grid[i].color;
            grid[i].color = '';
        }
    }
};

