export default function cellsAround({ numCols, numRows }) {
  const up = pos => ({ ...pos, row: pos.row - 1 })
  const down = pos => ({ ...pos, row: pos.row + 1 })
  const left = pos => ({ ...pos, col: pos.col - 1 })
  const right = pos => ({ ...pos, col: pos.col + 1 })

  const outOfBounds = (max, index) => index < 0 || index >= max

  return index => {
    const position = {
      col: index % numCols,
      row: Math.floor(index / numCols),
    }

    return [
      up(left(position)),
      up(position),
      up(right(position)),
      left(position),
      right(position),
      down(left(position)),
      down(position),
      down(right(position)),
    ]
      .filter(
        ({ col, row }) =>
          !outOfBounds(numCols, col) && !outOfBounds(numRows, row)
      )
      .map(({ col, row }) => row * numCols + col)
  }
}
