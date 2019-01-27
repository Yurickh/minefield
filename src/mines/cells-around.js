import { coordinatesFromIndex, indexFromCoordinates } from './coordinates'

const c = (f1, f2) => (...params) => f1(f2(...params))

export default function cellsAround({ numCols, numRows }) {
  const up = pos => ({ ...pos, row: pos.row - 1 })
  const down = pos => ({ ...pos, row: pos.row + 1 })
  const left = pos => ({ ...pos, col: pos.col - 1 })
  const right = pos => ({ ...pos, col: pos.col + 1 })
  const fromIndex = coordinatesFromIndex({ numCols })

  const outOfBounds = (max, index) => index < 0 || index >= max

  return index =>
    [
      c(up, left),
      up,
      c(up, right),
      left,
      right,
      c(down, left),
      down,
      c(down, right),
    ]
      .map(move => move(fromIndex(index)))
      .filter(
        ({ col, row }) =>
          !outOfBounds(numCols, col) && !outOfBounds(numRows, row)
      )
      .map(indexFromCoordinates({ numCols }))
}
