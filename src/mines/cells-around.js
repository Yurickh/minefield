const c = (f1, f2) => (...params) => f1(f2(...params))

export default function cellsAround({ numCols, numRows }) {
  const up = pos => ({ ...pos, row: pos.row - 1 })
  const down = pos => ({ ...pos, row: pos.row + 1 })
  const left = pos => ({ ...pos, col: pos.col - 1 })
  const right = pos => ({ ...pos, col: pos.col + 1 })

  const outOfBounds = (max, index) => index < 0 || index >= max

  return position =>
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
      .map(move => move(position))
      .filter(
        ({ col, row }) =>
          !outOfBounds(numCols, col) && !outOfBounds(numRows, row)
      )
}
