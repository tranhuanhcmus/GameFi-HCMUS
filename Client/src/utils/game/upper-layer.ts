type BlockPosition = { i: number; j: number };

type Block = {
  startCell: BlockPosition;
  endCell: BlockPosition;
};

class GameUpperLayer {
  private cellsInRow: number;
  private cellsInCol: number;

  constructor(cellsInRow: number, cellsInCol: number) {
    this.cellsInCol = cellsInCol;
    this.cellsInRow = cellsInRow;
  }

  /**
   * THIS METHOD TO GET THE COLLAPSE COLS
   * @param blockLists
   * @returns
   */
  getCollapseCols = (blockLists: Block[][]) => {
    const triggerCols = new Array(this.cellsInRow).fill(0);

    blockLists.forEach((blockList) => {
      blockList.forEach((block) => {
        for (let i = block.startCell.j; i <= block.endCell.j; i++) {
          triggerCols[i]++;
        }
      });
    });

    return triggerCols;
  };
}
