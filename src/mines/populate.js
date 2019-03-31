import cellsAround from './cells-around'
import { indexFromCoordinates, coordinatesFromIndex } from './coordinates'

import randomUntil from '../utils/random-until'

const emptyCell = {
  visible: false,
  isMine: false,
  minesAround: 0,
  marked: false,
}

function getRandomMinePositions(range, mines) {
  const randomizeMine = (forbidden, numMines) => {
    if (numMines <= 0) return forbidden
    const newMinePosition = randomUntil(forbidden)(range)

    return randomizeMine([...forbidden, newMinePosition], numMines - 1)
  }

  return randomizeMine([], mines)
}

export default function populate({ numMines, numCols, numRows }) {
  const cells = Array(numCols * numRows).fill(emptyCell)
  const getCellsAround = cellsAround({ numCols, numRows })

  const minePositions = getRandomMinePositions(numCols * numRows, numMines)

  const fromIndex = coordinatesFromIndex({ numCols, numRows })
  const toIndex = indexFromCoordinates({ numCols, numRows })

  const cellsWithMines = cells.map((cell, index) => ({
    ...cell,
    isMine: minePositions.includes(index),
    minesAround: getCellsAround(fromIndex(index)).filter(position =>
      minePositions.includes(toIndex(position))
    ).length,
  }))

  return Array(numRows)
    .fill(0)
    .map((_, index) => index * numCols)
    .map(index => cellsWithMines.slice(index, index + numCols))
}
