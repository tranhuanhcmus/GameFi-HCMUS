import {ROW, COLUMN} from './spec'
import {TileDataType} from './TileData'
import {ImageObjType} from './Images'
import {Dimensions} from 'react-native'

let Window = Dimensions.get('window')
let windowSpan = Math.min(Window.width, Window.height)
export const TILE_WIDTH = windowSpan / 6






export const findMoves = (tileData: TileDataType[][]) => {
  const copy = tileData.slice()
  let canMove = false

  for (var i = 0; i < COLUMN; i++) {
    for (var j = 0; j < ROW - 1; j++) {
      const swapStarter = copy[j][i]
      const swapEnder = copy[j + 1][i]
      copy[j][i] = swapEnder
      copy[j + 1][i] = swapStarter
      if (getAllMatches(copy).length > 0) {
        canMove = true
      }
      copy[j][i] = swapStarter
      copy[j + 1][i] = swapEnder
    }
  }

  for (var i = 0; i < ROW; i++) {
    for (var j = 0; j < COLUMN - 1; j++) {
      const swapStarter = copy[i][j]
      const swapEnder = copy[i][j + 1]
      copy[i][j] = swapEnder
      copy[i][j + 1] = swapStarter
      if (getAllMatches(copy).length > 0) {
        canMove = true
      }
      copy[i][j] = swapStarter
      copy[i][j + 1] = swapEnder
    }
  }

  return canMove
}

export const flattenArrayToPairs = (arr: any): number[] => {
  let flatterArray: number[] = []

  arr.map((row: any) => {
    row.map((e: any) => {
      flatterArray.push(e)
    })
  })

  if (Array.isArray(flatterArray[0]) === false) {
    return arr as number[]
  }

  return flattenArrayToPairs(flatterArray)
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const isMatch = (objOne: ImageObjType | null, objTwo: ImageObjType | null) => {
 if (objOne != null && objTwo != null) {
  if (objOne.image == objTwo.image) {
    return true
  } else if (objOne.isJar && objTwo.isJar) {
    return true
  } else {
    return false
  }
 }
}

export const checkRowsForMatch = (tileData: TileDataType[][]) => {
  let matches: number[][][] = []


// Iterate through the rows from top to bottom.
    for (var j = 0; j < 6; j++) {
      // Record the first index in the row.
      let firstIndex = [0,j]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[0][j].imgObj
// Traverse the elements of the row.
      for (var i = 0; i < 6; i++) {
// Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (i+1) < 6 ? tileData[i+1][j].imgObj: null
if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i+1,j])
} else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i+1,j]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (i+1) < 6 ? tileData[i+1][j].imgObj: null
      }
    }
  }
  return matches
}

export const checkColsForMatch = (tileData: TileDataType[][]) => {
  let matches: number[][][] = []

 // Iterate through the rows from top to bottom.
    for (var i = 0; i < 6; i++) {
      // Record the first index in the row.
      let firstIndex = [i,0]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[i][0].imgObj
// Traverse the elements of the row.
      for (var j = 0; j < 6; j++) {
// Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (j+1) < 6 ? tileData[i][j+1].imgObj: null
if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i,j+1])
} else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i,j+1]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (j+1) < 6 ? tileData[i][j+1].imgObj: null
      }
    }
  }
  return matches
}

export const getAllMatches = (tileData: TileDataType[][]) => {
 let rowMatches = checkRowsForMatch(tileData)
  let colMatches = checkColsForMatch(tileData)
return [...rowMatches,...colMatches]

}

export const markAsMatch = (matches: number[][][], tileData: TileDataType[][]) => {
 matches.forEach(match => {
    match.forEach(e => {
    let i = e[0]
    let j = e[1]
    tileData[i][j].markedAsMatch = true})
  })
}

export const condenseColumns = (tileData: TileDataType[][]) => {
   // Get number of rows and number of columns.
    let numOfRows = tileData[0].length
    let numOfCols = tileData.length
let spotsToFill = 0;
    for (let i = 0; i < numOfRows; i++) {
      spotsToFill = 0;
// Iterate through each column
      for (let j = numOfCols-1; j >= 0; j--) {
// Check to see if the element is a spot that needs filling.
        if (tileData[i][j].markedAsMatch == true) {
          // Increment the spots to fill since we found a spot to fill.
          spotsToFill++;
          // Place the location above the top of the screen for when it "falls"
          tileData[i][j].location.setValue({
            x: TILE_WIDTH * i,
            y: -4 * TILE_WIDTH
          });
} else if (spotsToFill > 0) {
          // Move bean downward
          const currentSpot = tileData[i][j];
          const newSpot = tileData[i][j + spotsToFill];
tileData[i][j] = newSpot;
          tileData[i][j + spotsToFill] = currentSpot;
        }
      }
    }
}

export const sleep = (ms: number) => {
  return new Promise(r => setTimeout(r, ms))
}
