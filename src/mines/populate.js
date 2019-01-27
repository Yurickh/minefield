import cellsAround from './cells-around'
import randomUntil from '../utils/random-until'

const emptyCell = {
  visible: false,
  isMine: false,
  minesAround: 0,
}

export default function populate({ numMines, numCols, numRows }) {
  const cells = Array(numCols * numRows).fill(emptyCell)
  const getCellsAround = cellsAround({ numCols, numRows })

  const minePositions = Array(numMines)
    .fill(0)
    .map((_, _index, filledPositions) =>
      randomUntil(filledPositions)(numCols * numRows)
    )

  const cellsWithMines = cells.map((cell, index) => {
    if (minePositions.includes(index)) {
      return { ...cell, isMine: true }
    }
    return cell
  })

  const cellsWithMinesAndNumbers = cellsWithMines.map((cell, index) => ({
    ...cell,
    minesAround: getCellsAround(index)
      .map(cellIndex => cellsWithMines[cellIndex])
      .filter(cell => cell.isMine).length,
  }))

  return Array(numRows)
    .fill(0)
    .map((_, index) => index * numCols)
    .map(index => cellsWithMinesAndNumbers.slice(index, index + numCols))
}
